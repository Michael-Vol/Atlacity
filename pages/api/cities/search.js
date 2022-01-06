import checkAuth from '../../../lib/middleware/checkAuth';
import connectToDB from '../../../lib/db';
import City from '../../../models/City';

const CitySearchHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			const { name } = req.query;
			if (!name) {
				return res.status(400).json({
					message: 'Name is required as a query parameter',
				});
			}
			await connectToDB();
			const cities = await City.find({ name: new RegExp('^' + name, 'i') });
			return res.json({
				cities,
			});
		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default CitySearchHandler;
