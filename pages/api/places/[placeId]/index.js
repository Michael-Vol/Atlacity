import connectToDB from '../../../../lib/db';
import Place from '../../../../models/Place';
import checkAuth from '../../../../lib/middleware/checkAuth';
import validateObjectId from '../../../../lib/middleware/validateObjectId';
import City from '../../../../models/City';
const placeHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			try {
				await connectToDB();

				const place = await Place.findById(req.query.placeId).populate('city');
				if (!place) {
					return res.status(400).json({
						message: 'Place not found',
					});
				}

				return res.json({
					place,
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
