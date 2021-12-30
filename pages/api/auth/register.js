import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import twilio from 'twilio';

import connectToDB from '../../../lib/db';
import initializeMiddleware from '../../../lib/middleware/initializeMiddleware';
import validateMiddleware from '../../../lib/middleware/validateMiddleware';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../../../lib/auth';
import User from '../../../models/User';
import getEnv from '../../../config/env';

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
	switch (req.method) {
		case 'POST': {
			try {
				const { firstName, lastName, email, password, dateOfBirth } = req.body;

				await validateBody(req, res);
				const errors = validationResult(req); //check for validation errors

				if (!errors.isEmpty()) {
					return res.status(422).json({ errors: errors.array() });
				}

				//connect to db
				const db = await connectToDB();

				//check if user already exists (email must be unique)
				const existsingUser = await User.findOne({ email });

				if (existsingUser) {
					return res.status(409).json({
						message: 'User Already Exists',
					});
				}

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

				//create access and refresh tokens
				const accessToken = createAccessToken(user);
				const refreshToken = createRefreshToken(user);
				sendRefreshToken(res, refreshToken);

				//Create twilio email verification
				const accountSID = getEnv('TWILIO_ACCOUNT_SID');
				const authToken = getEnv('TWILIO_AUTH_TOKEN');
				const emailServiceSid = getEnv('TWILIO_EMAIL_SERVICE_SID');
				const twilioClient = twilio(accountSID, authToken);

				const verification = await twilioClient.verify
					.services(emailServiceSid)
					.verifications.create({ to: user.email, channel: 'email' });
				console.log(verification);

				return res.status(201).json({
					message: 'User Created!',
					user,
					accessToken,
				});
			} catch (error) {
				console.log(error);
				res.status(500).json({
					message: 'Something went wrong!',
					error: error.message,
				});
			}
		}
		default:
			return res.status(405).json({
				message: 'Incorrect HTTP Method',
			});
	}
};
