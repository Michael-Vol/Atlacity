import ConnectToDB from '../../../lib/db';
import Place from '../../../models/Place';
import checkAuth from '../../../lib/middleware/checkAuth';
import UserProfile from '../../../models/UserProfile';

const PinnedPlacesHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			try {
				const profile = await UserProfile.findOne({ user: req.user._id }).populate('favouritePlaces');
				if (!profile) {
					return res.status(400).send({
						message: 'User profile not found',
					});
				}
				return res.json({
					places: profile.favouritePlaces,
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

export default checkAuth(PinnedPlacesHandler);
