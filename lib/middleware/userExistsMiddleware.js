import User from '../../models/User';

const userExists = (handler) => async (req, res) => {
	const existingUser = await User.findOne({ email: req.user.email });
	if (existingUser) {
		//conflict with existing user
		return res.status(409).json({
			message: 'User Already Exists',
		});
	}
	return handler(req, res);
};

export default userExists;
