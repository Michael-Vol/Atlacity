import checkAuth from '../../../lib/middleware/checkAuth';
import connectToDB from '../../../lib/db';
import City from '../../../models/City';

const PopularCitiesHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			await connectToDB();
			const { limit = 4 } = req.query;
			const popularCities = await City.find({})
				.sort({
					popularityIndex: -1,
				})
				.limit(parseInt(limit));

			return res.json({
				cities: popularCities,
			});

		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(PopularCitiesHandler);
