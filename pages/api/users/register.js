import connectToDB from '../../../lib/db';
import initializeMiddleware from '../../../lib/middleware/initializeMiddleware';
import validateMiddleware from '../../../lib/middleware/validateMiddleware';
import { check, validationResult } from 'express-validator';

export default async (req, res) => {
	//initialize validation middleware function to await later
	switch (req.method) {
		case 'POST': {
			const validateBody = initializeMiddleware(
				validateMiddleware(
					[
						check('firstName').not().isEmpty().withMessage('First Name is required!'),
						check('lastName').not().isEmpty().withMessage('Last Name is required!'),
						check('email').not().isEmpty().withMessage('Email is required!'),
						check('email').isEmail().withMessage('Email is not valid!'),
						check('password').not().isEmpty().withMessage('Password is required!'),
						check('dateOfBirth').not().isEmpty().withMessage('Date of Birth is required!'),
						check('dateOfBirth').isDate().withMessage('Date of Birth is not valid!'),
						check('password')
							.isLength({ min: 7 })
							.withMessage('Password must be at least 7 characters long!'),
					],
					validationResult
				)
			);
			const { firstName, lastName, email, password, dateOfBirth } = req.body;

			await validateBody(req, res);
			const errors = validationResult(req); //check for validation errors
			console.log(errors);

			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			return res.json({ firstName, lastName, email, password, dateOfBirth });
			break;
		}
		default:
			return res.status(405).json({
				message: 'Incorrect HTTP Method',
			});
	}
};
