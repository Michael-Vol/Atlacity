import Visit from '../../../../models/Visit';
import checkAuth from '../../../../lib/middleware/checkAuth';
import connectToDB from '../../../../lib/db';
import validateObjectId from '../../../../lib/middleware/validateObjectId';
import runMiddleware from '../../../../lib/middleware/runMiddleware';
import Place from '../../../../models/Place';
import multer from 'multer';

export const config = {
	api: {
		bodyParser: false,
	},
};

const upload = multer({
	fileFilter: (req, file, cb) => {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Only image files are allowed!'), false);
		}
		cb(null, true);
	},
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
});
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
		case 'POST':
			try {
				await connectToDB();

				await runMiddleware(req, res, upload.any('photos'));

				const place = await Place.findById(req.query.placeId);
				if (!place) {
					return res.status(400).json({
						message: 'Place not found',
					});
				}
				//add photos to place
				place.photos.push(...req.files);

				//add visit
				const visit = new Visit({
					place: req.query.placeId,
					date: new Date(req.body.date),
					title: req.body.title,
					description: req.body.description,
					visitor: req.user._id,
					rating: req.body.rating === 'true',
					isRecommended: req.body.isRecommended,
				});
				await visit.save();
				await place.save();
				const visits = await Visit.find({ place: req.query.placeId });
				return res.status(201).json({
					message: 'Visit added successfully',
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
