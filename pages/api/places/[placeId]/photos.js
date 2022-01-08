import connectToDB from '../../../../lib/db';
import Place from '../../../../models/Place';
import checkAuth from '../../../../lib/middleware/checkAuth';
import runMiddleware from '../../../../lib/middleware/runMiddleware';
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

const placesPhotosHandler = async (req, res) => {
	switch (req.method) {
		case 'GET': {
			await connectToDB();

			const place = await Place.findById(req.query.placeId);
			if (!place) {
				return res.status(400).json({
					message: 'Place not found',
				});
			}
			return res.status(200).json({
				photos: place.photos,
			});
		}
		case 'POST': {
			await connectToDB();

			await runMiddleware(req, res, upload.any('photos'));

			const place = await Place.findById(req.query.placeId);
			if (!place) {
				return res.status(400).json({
					message: 'Place not found',
				});
			}
			place.photos.push(...req.files);
			await place.save();
			return res.json({
				message: 'Photos uploaded successfully',
			});
		}
		default:
			return res.status(405).json({ message: 'Invalid HTTP method' });
	}
};

export default checkAuth(placesPhotosHandler);
