import twilio from 'twilio';

import User from '../../../models/User';
import connectToDB from '../../../lib/db';
import initializeMiddleware from '../../../lib/middleware/initializeMiddleware';
import validateMiddleware from '../../../lib/middleware/validateMiddleware';
import { check, validationResult } from 'express-validator';
import checkAuth from '../../../lib/middleware/checkAuth';
import getEnv from '../../../config/env';

const emailVerificationHandler = async (req, res) => {
	switch (req.method) {
		case 'POST': {
			try {
				const validateBody = initializeMiddleware(
					validateMiddleware(
						[
							check('code').not().isEmpty().withMessage('Verification Code is required'),
							check('code').isNumeric().withMessage('Verification code must be a number'),
						],
						validationResult
					)
				);

				await validateBody(req, res);

				const email = req.user.email;
				const code = req.body.code;

				await connectToDB();
				const user = await User.findOne({ email: req.user.email });

				// Check if user's email is already verified
				if (user.emailVerified) {
					return res.status(400).json({
						message: 'Email is already verified',
					});
				}
				//Verify twilio code with user's code

				const accountSID = getEnv('TWILIO_ACCOUNT_SID');
				const authToken = getEnv('TWILIO_AUTH_TOKEN');
				const emailServiceSid = getEnv('TWILIO_EMAIL_SERVICE_SID');
				const twilioClient = twilio(accountSID, authToken);

				const verification_check = await twilioClient.verify
					.services(emailServiceSid)
					.verificationChecks.create({
						to: email,
						code: code,
					});

				if (verification_check.status === 'approved') {
					user.emailVerified = true;
					await user.save();
					return res.json({
						message: 'Email Verified Successfully!',
						verified: true,
					});
				}
				return res.status(400).json({
					message: 'Invalid verification code',
					verified: false,
				});
			} catch (error) {
				console.log(error);
				return res.status(500).json({
					message: 'Something went wrong',
				});
			}
		}
		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(emailVerificationHandler);
