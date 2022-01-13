import multer from 'multer';

import connectToDB from '../../../../lib/db';
import checkAuth from '../../../../lib/middleware/checkAuth';
import UserProfile from '../../../../models/UserProfile';
import runMiddleware from '../../../../lib/middleware/runMiddleware';
import checkUserAccess from '../../../../lib/middleware/checkUserAccess';

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
		fileSize: 1024 * 1024 * 3,
	},
});

const avatarHandler = async (req, res) => {
	switch (req.method) {
		case 'POST':
			try {
				await connectToDB();

				await runMiddleware(req, res, upload.single('avatar'));

				let profile = await UserProfile.findOne({
					user: req.user._id,
				});
				if (!profile) {
					return res.status(400).json({
						message: 'You need to create a profile first in order to upload an avatar!',
					});
				}
				profile.avatar.imageType = req.file.mimetype;
				profile.avatar.buffer = req.file.buffer;
				await profile.save();

				return res.status(200).json({
					avatarUploaded: true,
					message: 'Avatar uploaded successfully',
				});
			} catch (error) {
				return res.status(400).json({
					message: error.message,
					exists: false,
				});
			}
		case 'GET':
			try {
				await connectToDB();

				const profile = await UserProfile.findOne({
					user: req.query.userId,
				});

				if (!profile || !profile.avatar.buffer) {
					return res.json({
						message: 'No Profile Avatar found',
						exists: false,
					});
				}
				return res.json({ avatar: profile.avatar, exists: true });
			} catch (error) {
				return res.status(400).json({
					message: error.message,
					exists: false,
				});
			}
		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(checkUserAccess(avatarHandler, { methods: ['POST'] }));
