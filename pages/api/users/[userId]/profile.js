import { check, validationResult } from 'express-validator';
import initializeMiddleware from '../../../../lib/middleware/initializeMiddleware';
import validateMiddleware from '../../../../lib/middleware/validateMiddleware';
import userExistsMiddleware from '../../../../lib/middleware/userExistsMiddleware';
import User from '../../../../models/User';
import connectToDB from '../../../../lib/db';
import checkAuth from '../../../../lib/middleware/checkAuth';

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

const profileHandler = async (req, res) => {
	switch (req.method) {
		case 'POST':
			return res.json({
				message: 'You are authenticated',
			});
			await validateBody(req, res);

			//connect to db
			const db = await connectToDB();

		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(profileHandler);
