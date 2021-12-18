import { check, validationResult } from 'express-validator';
import initializeMiddleware from '../../../../lib/middleware/initializeMiddleware';
import validateMiddleware from '../../../../lib/middleware/validateMiddleware';
import userExistsMiddleware from '../../../../lib/middleware/userExistsMiddleware';
import User from '../../../../models/User';
import connectToDB from '../../../../lib/db';
import { getSession } from 'next-auth/react';

// const validateBody = initializeMiddleware(
// 	validateMiddleware(
// 		[
// 			check('currentLocation').exists().isObject(),
// 			check('favouriteCities').isArray(),
// 			check('favouritePlaces').isArray(),
// 			check('about').notEmpty(),
// 			check('photo').isBuffer(),
// 		],
// 		validationResult
// 	)
// );

export default async (req, res) => {
	switch (req.method) {
		case 'POST':
			const session = await getSession({ req });
			if (session) {
				return res.json({
					message: 'You are authenticated',
				});
				await validateBody(req, res);

				//connect to db
				const db = await connectToDB();
			} else {
				return res.json({
					message: 'You are not authenticated',
				});
			}

		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};
