import { check, validationResult } from 'express-validator';

import User from '../../../models/User';
import connectToDB from '../../../lib/db';
import initializeMiddleware from '../../../lib/middleware/initializeMiddleware';
import validateMiddleware from '../../../lib/middleware/validateMiddleware';

export default async (req, res) => {
	switch (req.method) {
		case 'POST': {
			const { email, password } = req.body;

			//Body Validation (Middleware Initialization and Validation)
			const validateBody = initializeMiddleware(
				validateMiddleware(
					[
						check('email').not().isEmpty().withMessage('Email is required'),
						check('email').isEmail().withMessage('Email is not valid'),
						check('password').not().isEmpty().withMessage('Password is required'),
						check('password')
							.isLength({ min: 7 })
							.withMessage('Password must be at least 7 characters long'),
					],
					validationResult
				)
			);
			await validateBody(req, res);

			const db = await connectToDB();

			//Check if user exists
			try {
				const user = await User.findByCredentials(email, password);

				return res.json({
					message: 'Login successful',
					user,
				});
			} catch (error) {
				return res.status(401).json({
					message: error.message,
				});
			}
		}
		default: {
			return res.status(405).json({ message: 'Invalid HTTP Method' });
		}
	}
};
