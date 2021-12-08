import User from '../../models/User';

export default (email, db) => {
	return async (req, res, next) => {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			//conflict with existing user
			return res.status(409).json({
				message: 'User already exists',
			});
		}
		next();
	};
};
