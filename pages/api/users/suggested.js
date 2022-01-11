import connectToDB from '../../../lib/db';
import User from '../../../models/User';
import UserProfile from '../../../models/UserProfile';
import checkAuth from '../../../lib/middleware/checkAuth';

const suggestedUsersHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			try {
				await connectToDB();
				const profile = await UserProfile.findOne({ user: req.user._id });
				const currentLocationUsers = await UserProfile.find({
					currentLocation: profile.currentLocation,
					user: { $ne: req.user._id },
				})
					.select('-avatar')
					.populate('user');
				const notFollowedUsers = currentLocationUsers.filter(
					(user) => !profile.following.includes(user.user._id)
				);

				return res.json({
					users: notFollowedUsers,
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

export default checkAuth(suggestedUsersHandler);
