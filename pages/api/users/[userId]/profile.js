import { check, validationResult } from 'express-validator';
import initializeMiddleware from '../../../../lib/middleware/initializeMiddleware';
import validateMiddleware from '../../../../lib/middleware/validateMiddleware';
import checkUserAccess from '../../../../lib/middleware/checkUserAccess';
import UserProfile from '../../../../models/UserProfile';
import Place from '../../../../models/Place';
import City from '../../../../models/City';
import axios from 'axios';
import connectToDB from '../../../../lib/db';
import checkAuth from '../../../../lib/middleware/checkAuth';
import getEnv from '../../../../config/env';

const validateBody = initializeMiddleware(
	validateMiddleware(
		[
			check('currentLocation').exists().isObject().withMessage('Current Location must be an object'),
			check('favouriteCities').isArray().withMessage('favourite Cities must be an array'),
			check('about').notEmpty().withMessage('About Section is required'),
		],
		validationResult
	)
);

const profileHandler = async (req, res) => {
	switch (req.method) {
		case 'POST':
			try {
				//Check if profile exists
				const existingProfile = await UserProfile.findOne({
					user: req.user._id,
				});
				if (existingProfile) {
					return res.status(400).json({
						message: 'Profile already exists',
					});
				}
				const db = await connectToDB();

				await validateBody(req, res);

				//Check if current location place already exists
				let currentLocation = await Place.findOne({
					locationId: req.body.currentLocation.properties.place_id,
				});

				if (!currentLocation) {
					//Get current location city info from geoapify
					const apiKey = getEnv('GEOAPIFY_API_KEY');
					const cityInfo = await axios.get(
						`https://api.geoapify.com/v1/geocode/autocomplete?text=${req.body.currentLocation.city}&apiKey=${apiKey}`
					);

					let city = await City.findOne({
						locationId: cityInfo.data.features[0].properties.place_id,
					});

					if (!city) {
						city = new City({
							name:
								cityInfo.data.features[0].properties.name ||
								req.body.currentLocation.properties.city,
							locationId: cityInfo.data.features[0].properties.place_id,
						});
						await city.save();
					}

					//Create new Location based on locationId (place_id on geoapify api)
					currentLocation = new Place({
						locationId: req.body.currentLocation.properties.place_id,
						name:
							req.body.currentLocation.properties.name ||
							req.body.currentLocation.properties.city,
						city: city._id,
					});
					await currentLocation.save();
				}

				//Check which favouriteCities already exist
				const favouriteCities = await Promise.all(
					req.body.favouriteCities.map(async (location) => {
						//find city based on locationId
						let city = await City.findOne({ locationId: location.properties.place_id });
						if (!city) {
							city = new City({
								locationId: location.properties.place_id,
								name: location.properties.name || location.properties.city,
							});
							await city.save();
						}

						return city._id;
					})
				);

				console.log(favouriteCities);
				const profile = new UserProfile({
					user: req.user._id,
					about: req.body.about,
					currentLocation: currentLocation._id,
					favouriteCities,
				});

				await profile.save();

				return res.status(201).json({
					message: 'Created Profile',
					profile,
				});
			} catch (error) {
				console.log(error);
				return res.status(400).json({
					message: error.message,
				});
			}
		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(checkUserAccess(profileHandler, { methods: ['POST'] }));
