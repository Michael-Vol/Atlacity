import checkAuth from '../../../lib/middleware/checkAuth';
import connectToDB from '../../../lib/db';
import Place from '../../../models/Place';

const PlaceSearchHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			const { name, limit = 5 } = req.query;
			if (!name) {
				return res.status(400).json({
					message: 'Name is required as a query parameter',
				});
			}
			await connectToDB();
			const places = await Place.find({ name: new RegExp('^' + name, 'i') }).limit(parseInt(limit));
			return res.json({
				places,
			});
		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(PlaceSearchHandler);
