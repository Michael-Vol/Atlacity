import { check, validationResult } from 'express-validator';

import connectToDB from '../../../lib/db';
import initializeMiddleware from '../../../lib/middleware/initializeMiddleware';
import validateMiddleware from '../../../lib/middleware/validateMiddleware';
import userExistsMiddleware from '../../../lib/middleware/userExistsMiddleware';
import User from '../../../models/User';
const bcrypt = require('bcryptjs');

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

export default async (req, res) => {
	//initialize validation middleware function to await later
	switch (req.method) {
		case 'POST': {
			const { firstName, lastName, email, password, dateOfBirth } = req.body;

			await validateBody(req, res);
			const errors = validationResult(req); //check for validation errors

			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			//connect to db
			const db = await connectToDB();

			//check if user already exists (email must be unique)
			const userAlreadyExists = initializeMiddleware(userExistsMiddleware(email, db));
			await userAlreadyExists(req, res);

			//hash user password before storing it in db

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			//create new user
			const user = new User({
				firstName,
				lastName,
				email,
				dateOfBirth,
				password: hashedPassword,
			});

			await user.save(); //save user to db

			return res.status(201).json({
				message: 'User Created!',
				user,
			});
		}
		default:
			return res.status(405).json({
				message: 'Incorrect HTTP Method',
			});
	}
};
