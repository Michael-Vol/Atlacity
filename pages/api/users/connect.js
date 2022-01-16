import connectToDB from '../../../lib/db';
import checkAuth from '../../../lib/middleware/checkAuth';
import User from '../../../models/User';
import Visit from '../../../models/Visit';
import Place from '../../../models/Place';
import UserProfile from '../../../models/UserProfile';

const ConnectHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			try {
				await connectToDB();

				const profile = await UserProfile.findOne({ user: req.user._id });

				//find users with same location
				const sameLocationUsers = await UserProfile.find({
					currentLocation: profile.currentLocation,
				})
					.populate('user')
					.select('user');

				//find users that visit places with low popularity
				const lowPopularityPlaces = await Place.find({
					popularityIndex: { $lt: 5 },
				});
				let lowPopularityVisitors = await Visit.find({
					place: { $in: lowPopularityPlaces },
				}).select('visitor');

				lowPopularityVisitors = lowPopularityVisitors.map((visit) => visit.visitor.toString());
				lowPopularityVisitors = [...new Set(lowPopularityVisitors)];
				lowPopularityVisitors = await Promise.all(
					lowPopularityVisitors.map(async (visitor) => {
						const user = await User.findById(visitor);
						return user;
					})
				);

				return res.json({
					sameLocationUsers,
					lowPopularityVisitors,
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

export default checkAuth(ConnectHandler);
