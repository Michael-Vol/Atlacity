import connectToDB from '../../../../lib/db';
import UserProfile from '../../../../models/UserProfile';
import Place from '../../../../models/Place';
import City from '../../../../models/City';
import initializeMiddleware from '../../../../lib/middleware/initializeMiddleware';
import validateMiddleware from '../../../../lib/middleware/validateMiddleware';
import { check, validationResult } from 'express-validator/check';
import checkUserAccess from '../../../../lib/middleware/checkUserAccess';
import checkAuth from '../../../../lib/middleware/checkAuth';

const favouritesHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			const { userId } = req.query;
			await connectToDB();

			const profile = await UserProfile.findOne({ user: userId });
			if (!profile) {
				return res.status(404).json({
					message: 'User Profile not found',
				});
			}
			const { favouritePlaces, favouriteCities } = profile;
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

			return res.json({
				favouritePlaces: populatedPlaces,
				favouriteCities: populatedCities,
			});
		case 'PATCH':
			try {
				const allowedTypes = ['favouriteCities', 'favouritePlaces'];
				const { favourites, type } = req.body;

				const validateBody = initializeMiddleware(
					validateMiddleware(
						[
							check('type').exists().withMessage('Type is required!'),
							check('type')
								.isIn(allowedTypes)
								.withMessage(
									'Type is not allowed! Allowed Types include : favouriteCities,favouritePlaces'
								),
							check('favourites').exists().withMessage('Favourites is required!'),
							check('favourites')
								.isArray({ min: 1 })
								.withMessage('Favourites must be an array with at least one item!'),
						],
						validationResult
					)
				);

				await validateBody(req, res);

				const { userId } = req.query;
				await connectToDB();

				const profile = await UserProfile.findOne({ user: userId });

				if (!profile) {
					return res.status(404).json({
						message: 'User Profile not found',
					});
				}

				const isValidOperation = allowedTypes.includes(type);
				if (!isValidOperation) {
					return res.status(400).json({
						message: 'Invalid update',
					});
				}

				if (type === 'favouriteCities') {
					await Promise.all(
						req.body.favourites.map(async (favouriteCity) => {
							//Check if favourite city has already been added
							const existingCity = await City.findOne({
								locationId: favouriteCity.properties.place_id,
							});
							if (!existingCity) {
								//Add city to database
								const city = new City({
									locationId: favouriteCity.properties.place_id,
									name: favouriteCity.properties.name || favouriteCity.properties.city,
								});
								await city.save();
								profile.favouriteCities.push(city._id);
							} else {
								//Check if city is already in profile favourites
								const isProfileDuplicate = profile.favouriteCities.includes(existingCity._id);
								if (!isProfileDuplicate) {
									profile.favouriteCities.push(existingCity._id);
									await profile.save();
								}
							}
						})
					);
				} else if (type === 'favouritePlaces') {
					await Promise.all(
						req.body.favourites.map(async (favouritePlace) => {
							//Check if favourite place has already been added
							const existingPlace = await Place.findOne({
								locationId: favouritePlace.properties.place_id,
							});
							if (!existingPlace) {
								//Add place to database
								const place = new Place({
									locationId: favouritePlace.properties.place_id,
									name: favouritePlace.properties.name || favouritePlace.properties.city,
								});
								await place.save();
								profile.favouritePlaces.push(place._id);
								await profile.save();
							} else {
								//Check if place is already in profile favourites
								const isProfileDuplicate = profile.favouritePlaces.includes(
									existingPlace._id
								);
								if (!isProfileDuplicate) {
									profile.favouritePlaces.push(existingPlace._id);
									await profile.save();
								}
							}
						})
					);
				}
				return res.json({
					message: 'Favourites updated',
					favourites:
						type === 'favouriteCities' ? profile.favouriteCities : profile.favouritePlaces,
				});
			} catch (error) {
				console.log(error);
				return res.status(500).json({
					message: 'Something went wrong',
				});
			}
		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(checkUserAccess(favouritesHandler, { methods: ['PATCH'] }));
