import connectToDB from '../../../../lib/db';
import UserProfile from '../../../../models/UserProfile';

export default async (req, res) => {
	switch (req.method) {
		case 'GET':
			const { userId } = req.query;
			await connectToDB();

			const profile = await UserProfile.findOne({ user: userId });
			if (!profile) {
				return res.status(404).json({
					message: 'User Profile not found',
				});
			}

			return res.json({
				favouritePlaces: profile.favouritePlaces,
				favouriteCities: profile.favouriteCities,
			});

		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};
