import connectToDB from '../../../../lib/db';
import Place from '../../../../models/Place';
import UserProfile from '../../../../models/UserProfile';
import checkAuth from '../../../../lib/middleware/checkAuth';
import validateObjectId from '../../../../lib/middleware/validateObjectId';

const UnPinPlaceHandler = async (req, res) => {
	switch (req.method) {
		case 'POST':
			await connectToDB();
			const place = await Place.findById(req.query.placeId);
			if (!place) {
				return res.status(404).json({
					message: 'Place not found',
				});
			}

			const profile = await UserProfile.findOne({ user: req.user._id });
			if (!profile) {
				return res.status(404).json({
					message: 'User not found',
				});
			}
			if (!profile.favouritePlaces.includes(place._id)) {
				return res.status(400).json({
					message: 'Place is already not pinned',
				});
			}

			profile.favouritePlaces = profile.favouritePlaces.filter(
				(id) => id.toString() !== place._id.toString()
			);

			await profile.save();

			return res.json({
				message: 'Place unpinned successfully',
			});

		default:
			return res.status(405).json({ message: 'Invalid HTTP method' });
	}
};

export default checkAuth(validateObjectId(UnPinPlaceHandler, 'placeId'));
