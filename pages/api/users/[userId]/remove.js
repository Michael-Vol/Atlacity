import connectToDB from '../../../../lib/db';
import UserProfile from '../../../../models/UserProfile';
import User from '../../../../models/User';
import checkAuth from '../../../../lib/middleware/checkAuth';
import validateObjectId from '../../../../lib/middleware/validateObjectId';

const UnFollowUserHandler = async (req, res) => {
	switch (req.method) {
		case 'POST':
			try {
				await connectToDB();
				const myProfile = await UserProfile.findOne({ user: req.user._id });
				const userProfile = await UserProfile.findOne({ user: req.query.userId });

				if (!userProfile) {
					return res.status(404).json({
						message: 'User not found',
					});
				}
				if (userProfile.user.toString() === myProfile.user.toString()) {
					return res.status(400).json({
						message: 'You can not remove yourself from suggestions',
					});
				}
				if (myProfile.removedUsers.includes(userProfile.user)) {
					return res.status(400).json({
						message: 'User is already removed from suggestions',
					});
				}
				myProfile.removedUsers.push(userProfile.user);

				await myProfile.save();

				return res.json({
					message: 'User removed from suggestions',
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

export default checkAuth(validateObjectId(UnFollowUserHandler, 'userId'));
