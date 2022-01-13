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
import validateObjectId from '../../../../lib/middleware/validateObjectId';

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
		case 'GET':
			try {
				await connectToDB();
				const profile = await UserProfile.findOne({ user: req.query.userId }).populate('user');
				if (!profile) {
					return res.status(404).json({
						message: 'User profile not found',
					});
				}
				const { favouritePlaces, favouriteCities, currentLocation } = profile;
				//Populate currentLocation
				const populatedCurrentLocation = await City.findById(currentLocation);
				//Populate favourites

				const populatedPlaces = await Promise.all(
					favouritePlaces.map(async (placeId) => {
						const place = await Place.findById(placeId);
						return place;
					})
				);
				const populatedCities = await Promise.all(
					favouriteCities.map(async (cityId) => {
						const city = await City.findById(cityId);
						return city;
					})
				);

				//Remove avatar from response
				const { avatar, ...rest } = profile.toObject();
				const filteredProfile = {
					...rest,
					favouritePlaces: populatedPlaces,
					favouriteCities: populatedCities,
					currentLocation: populatedCurrentLocation,
				};

				return res.json({
					profile: filteredProfile,
					message: 'User profile found',
				});
			} catch (error) {
				console.log(error);
				res.status(500).json({
					message: 'Something went wrong',
				});
			}
		case 'POST':
			try {
				await connectToDB();

				await validateBody(req, res);
				console.log(req.body);

				//Check if current location  already exists in cities

				let currentLocation = await City.findOne({
					locationId: req.body.currentLocation.properties.place_id,
				});

				if (!currentLocation) {
					currentLocation = new City({
						locationId: req.body.currentLocation.properties.place_id,
						name: req.body.currentLocation.properties.name,
						info: req.body.currentLocation.properties,
					});
					//Get photo for city
					const unsplashKey = getEnv('UNSPLASH_CLIENT_ID');
					const unsplashResponse = await axios.get(
						`https://api.unsplash.com/search/photos?page=1&query=${currentLocation.name}&client_id=${unsplashKey}`
					);
					currentLocation.photos = unsplashResponse.data.results[0].urls;
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
								info: location.properties,
							});
							//Get photo for city
							const unsplashKey = getEnv('UNSPLASH_CLIENT_ID');
							const unsplashResponse = await axios.get(
								`https://api.unsplash.com/search/photos?page=1&query=${city.name}&client_id=${unsplashKey}`
							);
							city.photos = unsplashResponse.data.results[0].urls;
						} else {
							city.popularityIndex = city.popularityIndex + 1; //Increment popularity index if city already exists
						}
						await city.save();

						return city._id;
					})
				);

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

export default checkAuth(validateObjectId(checkUserAccess(profileHandler, { methods: ['POST'] }), 'userId'));
