import Visit from '../../../../models/Visit';
import checkAuth from '../../../../lib/middleware/checkAuth';
import connectToDB from '../../../../lib/db';
import validateObjectId from '../../../../lib/middleware/validateObjectId';

const placeVisitsHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			try {
				const visits = await Visit.find({ place: req.query.placeId });
				return res.json({
					visits,
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

export default checkAuth(validateObjectId(placeVisitsHandler, 'placeId'));
