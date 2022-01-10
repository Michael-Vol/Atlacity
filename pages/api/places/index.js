import connectToDB from '../../../lib/db';
import Place from '../../../models/Place';
import checkAuth from '../../../lib/middleware/checkAuth';
import initializeMiddleware from '../../../lib/middleware/initializeMiddleware';
import validateMiddleware from '../../../lib/middleware/validateMiddleware';
import { check, validationResult } from 'express-validator';

const placesHandler = async (req, res) => {
	switch (req.method) {
		case 'POST':
			const validateBody = initializeMiddleware(
				validateMiddleware(
					[
						check('name').exists().withMessage('Name is required'),
						check('name').isString().withMessage('Name must be a string'),
						check('address').exists().withMessage('Address is required'),
						check('address').isString().withMessage('Address must be a string'),
						check('coords').exists().withMessage('Coords is required'),
						check('coords').isObject().withMessage('Coords must be an object'),
						check('description').exists().withMessage('Description is required'),
						check('description').isString().withMessage('Description must be a string'),
						check('city').exists().withMessage('City is required'),
						check('category').exists().withMessage('Category is required'),
						check('category').isString().withMessage('Category must be a string'),
					],
					validationResult
				)
			);

			await validateBody(req, res);
			const existingPlace = await Place.findOne({
				$or: [
					{ name: req.body.name },
					{ 'coords.lat': req.body.coords.lat },
					{ 'coords.lng': req.body.coords.lng },
				],
			});

			if (existingPlace) {
				return res.status(400).json({
					message: 'This place already exists',
				});
			}

			const place = new Place(req.body);
			await place.save();

			return res.status(201).json({
				message: 'Place created successfully',
				place,
			});

		default:
			return res.status(405).json({ message: 'Invalid HTTP method' });
	}
};

export default checkAuth(placesHandler);
