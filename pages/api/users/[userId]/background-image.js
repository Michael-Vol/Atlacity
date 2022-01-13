import connectToDB from '../../../../lib/db';
import UserProfile from '../../../../models/UserProfile';
import checkAuth from '../../../../lib/middleware/checkAuth';
import checkUserAccess from '../../../../lib/middleware/checkUserAccess';

const BackgroundImageHandler = async (req, res) => {
	switch (req.method) {
		case 'POST':
			await connectToDB();
			const userProfile = await UserProfile.findOne({ user: req.query.userId });
			if (!userProfile) {
				return res.status(404).json({ error: 'User not found' });
			}
			const { backgroundImage } = req.body;
			if (!backgroundImage) {
				return res.status(400).json({ error: 'No background image provided' });
			}
			userProfile.backgroundImage = backgroundImage;
			await userProfile.save();
			return res.status(200).json({ message: 'Background image updated', backgroundImage });
		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(checkUserAccess(BackgroundImageHandler, { methods: ['POST'] }));
