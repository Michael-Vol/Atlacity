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
						message: 'You can not unfollow yourself',
					});
				}
				console.log(myProfile.following, userProfile.user);
				if (!myProfile.following.includes(userProfile.user)) {
					return res.status(400).json({
						message: 'User is already not followed',
					});
				}
				myProfile.following = myProfile.following.filter(
					(id) => id.toString() !== userProfile.user.toString()
				);
				userProfile.followers = userProfile.followers.filter(
					(id) => id.toString() !== myProfile.user.toString()
				);

				await myProfile.save();
				await userProfile.save();

				return res.json({
					message: 'User unfollowed',
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
