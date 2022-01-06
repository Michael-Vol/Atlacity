import connectToDB from '../../../../lib/db';
import UserProfile from '../../../../models/UserProfile';
import Place from '../../../../models/Place';
import City from '../../../../models/City';
import initializeMiddleware from '../../../../lib/middleware/initializeMiddleware';
import validateMiddleware from '../../../../lib/middleware/validateMiddleware';
import { check, validationResult } from 'express-validator/check';
import checkUserAccess from '../../../../lib/middleware/checkUserAccess';
import checkAuth from '../../../../lib/middleware/checkAuth';
import getEnv from '../../../../config/env';
import axios from 'axios';

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
				let populatedCities, populatedPlaces;

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
									info: favouriteCity.properties,
								});
								//Get photo for city
								const unsplashKey = getEnv('UNSPLASH_CLIENT_ID');
								const unsplashResponse = await axios.get(
									`https://api.unsplash.com/search/photos?page=1&query=${city.name}&client_id=${unsplashKey}`
								);
								city.photos = unsplashResponse.data.results[0].urls;
								await city.save();
								profile.favouriteCities.push(city._id);
								await profile.save();
							} else {
								//Check if city is already in profile favourites
								const isProfileDuplicate = profile.favouriteCities.includes(existingCity._id);
								if (!isProfileDuplicate) {
									existingCity.popularityIndex = existingCity.popularityIndex + 1; //Increment popularity index when city already exists
									await existingCity.save();
									profile.favouriteCities.push(existingCity._id);
									await profile.save();
								}
							}
						})
					);
					populatedCities = await Promise.all(
						profile.favouriteCities.map(async (cityId) => {
							const city = await City.findById(cityId);
							if (city) {
								return city;
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
									existingPlace.popularityIndex = existingPlace.popularityIndex + 1; //Increment popularity index when place already exists
									await existingPlace.save();
									profile.favouritePlaces.push(existingPlace._id);
									await profile.save();
								}
							}
						})
					);
					populatedPlaces = await Promise.all(
						profile.favouritePlaces.map(async (placeId) => {
							const place = await Place.findById(placeId);
							if (place) {
								return place;
							}
						})
					);
				}
				return res.json({
					message: 'Favourites updated',
					profile: {
						...profile,
						favouriteCities: populatedCities,
						favouritePlaces: populatedPlaces,
					},
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
