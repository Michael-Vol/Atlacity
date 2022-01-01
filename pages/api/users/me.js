import checkAuth from '../../../lib/middleware/checkAuth';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../../../lib/auth';
import connectToDB from '../../../lib/db';

const meHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			try {
				const accessToken = createAccessToken(req.user);
				const refreshToken = createRefreshToken(req.user);
				sendRefreshToken(res, refreshToken);

				return res.json({
					message: 'Successfully loaded User',
					user: req.user,
					accessToken,
				});
			} catch (error) {
				console.log(error);
				return res.status(500).json({
					message: 'Something went wrong',
				});
			}
		case 'PATCH':
			try {
				const allowedUpdates = ['firstName', 'lastName', 'email', 'dateOfBirth'];
				const updates = Object.keys(req.body);
				const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
				if (!isValidOperation) {
					return res.status(400).json({
						message: 'Invalid updates',
					});
				}
				await connectToDB();
				updates.forEach((update) => (req.user[update] = req.body[update]));
				await req.user.save();
				return res.json({
					message: 'Successfully updated User',
					user: req.user,
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

export default checkAuth(meHandler);
