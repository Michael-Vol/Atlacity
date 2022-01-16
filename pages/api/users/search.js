import checkAuth from '../../../lib/middleware/checkAuth';
import connectToDB from '../../../lib/db';
import User from '../../../models/User';

const UsersSearchHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			const { name, limit = 5 } = req.query;
			if (!name) {
				return res.status(400).json({
					message: 'Name is required as a query parameter',
				});
			}
			await connectToDB();

			const users = await User.find({
				$or: [{ firstName: new RegExp('^' + name, 'i') }, { lastName: new RegExp('^' + name, 'i') }],
			}).limit(parseInt(limit));
			return res.json({
				users,
			});
		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(UsersSearchHandler);
