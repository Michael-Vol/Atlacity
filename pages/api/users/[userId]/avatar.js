import multer from 'multer';

import connectToDB from '../../../../lib/db';
import checkAuth from '../../../../lib/middleware/checkAuth';
import UserProfile from '../../../../models/UserProfile';
import initializeMiddleware from '../../../../lib/middleware/initializeMiddleware';
import userExists from '../../../../lib/middleware/userExistsMiddleware';

const upload = multer({
	fil,
});

const avatarHandler = async (req, res) => {
	switch (req.method) {
		case 'POST':
			await connectToDB();

			const multer = initializeMiddleware(upload.single('avatar'));

			let profile = await UserProfile.findOne({
				user: req.user._id,
			});

			if (!profile) {
				//Create new profile
				profile = new UserProfile({
					user: req.user._id,
					// avatar: req.file.buffer,
				});
			} else {
				//Update existing profile
				// console.log(req.file.buffer);
				// profile.avatar = req.file.buffer;
			}
			await profile.save();

			return res.status(200).json({
				avatarUploaded: true,
				message: 'Avatar uploaded successfully',
			});
		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(avatarHandler);
