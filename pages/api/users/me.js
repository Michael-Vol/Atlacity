import checkAuth from '../../../lib/middleware/checkAuth';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../../../lib/auth';
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
		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(meHandler);
