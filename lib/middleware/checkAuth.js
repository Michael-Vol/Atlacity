import { verify } from 'jsonwebtoken';
import User from '../../models/User';
import connectToDB from '../../lib/db';

const checkAuth = (handler) => {
	return async (req, res) => {
		try {
			await connectToDB();
			const authorization = req.headers['authorization'];
			if (!authorization) throw new Error('Not Authenticated');

			const token = authorization.split(' ')[1];
			const decodedToken = verify(token, process.env.ACCESS_TOKEN_SECRET);

			const user = await User.findById(decodedToken.user);
			if (!user) throw new Error('Not Authenticated');

			req.user = user;
			return handler(req, res);
		} catch (e) {
			console.log(e.message);

			res.status(401).json({
				message: 'Authentication Expired',
			});
		}
	};
};

export default checkAuth;
