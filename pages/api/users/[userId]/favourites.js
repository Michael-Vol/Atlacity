import connectToDB from '../../../../lib/db';
import UserProfile from '../../../../models/UserProfile';
import Place from '../../../../models/Place';
import City from '../../../../models/City';

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
			const { favouritePlaces, favouriteCities } = profile;
			const populatedPlaces = await Promise.all(
				favouritePlaces.map(async (placeId) => {
					const place = await Place.findById(placeId);
					return place;
				})
			);
			const populatedCities = await Promise.all(
				favouriteCities.map(async (cityId) => {
					const city = await City.findById(cityId);
					return city;
				})
			);

			return res.json({
				favouritePlaces: populatedPlaces,
				favouriteCities: populatedCities,
			});

		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};
