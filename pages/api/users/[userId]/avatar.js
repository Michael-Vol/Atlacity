import multer from 'multer';

import connectToDB from '../../../../lib/db';
import checkAuth from '../../../../lib/middleware/checkAuth';
import UserProfile from '../../../../models/UserProfile';
import runMiddleware from '../../../../lib/middleware/runMiddleware';

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
			await connectToDB();

			await runMiddleware(req, res, upload.single('avatar'));

			console.log(req.file);

			let profile = await UserProfile.findOne({
				user: req.user._id,
			});

			// if (!profile) {
			// 	//Create new profile
			// 	profile = new UserProfile({
			// 		user: req.user._id,
			// 		// avatar: req.file.buffer,
			// 	});
			// } else {
			// 	//Update existing profile
			// 	// console.log(req.file.buffer);
			// 	// profile.avatar = req.file.buffer;
			// }
			// await profile.save();

			return res.status(200).json({
				avatarUploaded: true,
				message: 'Avatar uploaded successfully',
			});
		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(avatarHandler);
