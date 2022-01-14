import connectToDB from '../../../../lib/db';
import Place from '../../../../models/Place';
import checkAuth from '../../../../lib/middleware/checkAuth';
import runMiddleware from '../../../../lib/middleware/runMiddleware';
import multer from 'multer';
import sharp from 'sharp';

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
			await Promise.all(
				req.files.map(async (file) => {
					const { data, info } = await sharp(file.buffer)
						.resize({ width: 1200, height: 900, fit: 'fill' })
						.png({ quality: 100 })
						.toBuffer({ resolveWithObject: true });

					file.buffer = data;
					file.size = info.size;
					place.photos.push(file);
				})
			);

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
