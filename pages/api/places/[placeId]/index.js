import connectToDB from '../../../../lib/db';
import Place from '../../../../models/Place';
import checkAuth from '../../../../lib/middleware/checkAuth';
import validateObjectId from '../../../../lib/middleware/validateObjectId';
import City from '../../../../models/City';
import UserProfile from '../../../../models/UserProfile';

const placeHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			try {
				await connectToDB();

				const place = await Place.findById(req.query.placeId).populate('city');
				const profile = await UserProfile.findOne({ user: req.user._id });

				if (!profile) {
					return res.status(404).json({
						message: 'User not found',
					});
				}

				if (!place) {
					return res.status(400).json({
						message: 'Place not found',
					});
				}
				const isPinned = profile.favouritePlaces.includes(place._id);

				return res.json({
					place: {
						...place.toJSON(),
						isPinned,
					},
				});
			} catch (error) {
				console.log(error);
				return res.status(500).json({
					message: 'Something went wrong',
				});
			}
		default:
			return res.status(405).json({ message: 'Invalid HTTP method' });
	}
};

export default checkAuth(validateObjectId(placeHandler, 'placeId'));
