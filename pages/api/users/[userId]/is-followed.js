import connectToDB from '../../../../lib/db';
import User from '../../../../models/User';
import UserProfile from '../../../../models/UserProfile';
import checkAuth from '../../../../lib/middleware/checkAuth';
import validateObjectId from '../../../../lib/middleware/validateObjectId';

const isFollowedHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			try {
				await connectToDB();

				const profile = await UserProfile.findOne({ user: req.user._id });
				const isFollowed = profile.following.includes(req.query.userId);

				return res.status(200).json({ isFollowed });
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

export default checkAuth(validateObjectId(isFollowedHandler, 'userId'));
