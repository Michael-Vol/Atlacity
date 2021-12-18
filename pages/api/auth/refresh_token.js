import { verify } from 'jsonwebtoken';
import cookie from 'cookie';
import { createAccessToken, sendRefreshToken, createRefreshToken } from '../../../lib/auth';
import connectToDB from '../../../lib/db';
import getEnv from '../../../config/env';
import User from '../../../models/User';

export default async (req, res) => {
	if (req.method === 'POST') {
		if (!req.headers.cookie) {
			return res.status(401).json({
				status: 'Unauthorized',
				accessToken: '',
			});
		}

		const getToken = cookie.parse(req.headers.cookie);
		const token = getToken.token;

		if (!token) {
			return res.status(401).json({
				status: 'Unauthorized',
				accessToken: '',
			});
		}

		try {
			await connectToDB();
			const REFRESH_TOKEN_SECRET = getEnv('REFRESH_TOKEN_SECRET');
			const payload = verify(token, REFRESH_TOKEN_SECRET);

			const user = await User.findById(payload.userId);

			if (!user) {
				return res.status(401).json({
					status: 'Unauthorized',
					accessToken: '',
				});
			}
			sendRefreshToken(res, createRefreshToken(user));
			const accessToken = createAccessToken(user);

			return res.json({
				message: 'You are authenticated',
				user,
				accessToken: accessToken,
			});
		} catch (error) {
			console.log(error.message);
			return res.status(401).json({
				status: 'Unauthorized',
				accessToken: '',
			});
		}
	} else {
		return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};
