import User from '../../../models/User';
import connectToDB from '../../../lib/db';
import checkAuth from '../../../lib/middleware/checkAuth';
import bcrypt from 'bcryptjs';
const ChangePasswordHandler = async (req, res) => {
	switch (req.method) {
		case 'POST':
			try {
				const mandatoryInputFields = ['oldPassword', 'newPassword'];
				const inputfields = Object.keys(req.body);

				//Check if all mandatory fields are present

				if (inputfields.length !== mandatoryInputFields.length) {
					return res.status(400).json({
						message: 'Invalid input fields',
						isUpdated: false,
					});
				}
				//Check if input fields are valid
				const isValidInput = inputfields.every((field) => mandatoryInputFields.includes(field));

				if (!isValidInput) {
					return res.status(400).json({
						message: 'Invalid input fields',
						passwordUpdated: false,
					});
				}

				//Check if password is at least 7 characters long

				if (req.body.newPassword.length < 7) {
					return res.status(400).json({
						message: 'Password must be at least 7 characters long',
						passwordUpdated: false,
					});
				}

				await connectToDB();

				//Check if old password is equal current password in db

				//Check for password match
				const isPasswordMatch = await bcrypt.compare(req.body.oldPassword, req.user.password);

				if (!isPasswordMatch) {
					return res.status(400).json({
						message: 'Old password is incorrect',
						passwordUpdated: false,
					});
				}

				//hash user password before storing it in db

				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
				req.user.password = hashedPassword;
				await req.user.save();
				return res.json({
					message: 'Password changed successfully',
					passwordUpdated: true,
				});
			} catch (error) {
				console.log(error);
				return res.status(500).json({
					message: 'Something went wrong',
					passwordUpdated: false,
				});
			}

		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(ChangePasswordHandler);
