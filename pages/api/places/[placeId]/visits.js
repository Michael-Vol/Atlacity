import Visit from '../../../../models/Visit';
import UserProfile from '../../../../models/UserProfile';
import checkAuth from '../../../../lib/middleware/checkAuth';
import connectToDB from '../../../../lib/db';
import validateObjectId from '../../../../lib/middleware/validateObjectId';
import runMiddleware from '../../../../lib/middleware/runMiddleware';
import Place from '../../../../models/Place';
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
const placeVisitsHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			try {
				const visits = await Visit.find({ place: req.query.placeId }).populate('visitor');
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
				const profile = await UserProfile.findOne({ user: req.user._id });
				if (!profile) {
					return res.status(404).json({
						message: 'User profile not found',
					});
				}
				const place = await Place.findById(req.query.placeId);
				if (!place) {
					return res.status(400).json({
						message: 'Place not found',
					});
				}
				//add photos to place
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

				//add visit
				const visit = new Visit({
					place: req.query.placeId,
					date: new Date(req.body.date),
					title: req.body.title,
					description: req.body.description,
					visitor: req.user._id,
					rating: req.body.rating,
					isRecommended: req.body.isRecommended,
				});

				await visit.save();
				if (!place.visitors.includes(req.user._id)) {
					place.visitors.push(req.user._id);
				}

				await place.save();
				const visits = await Visit.find({ place: req.query.placeId }).populate('visitor');

				//update profile visits
				profile.visits.push(visit._id);
				await profile.save();
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
