import connectToDB from '../../../../lib/db';
import checkAuth from '../../../../lib/middleware/checkAuth';

const avatarHandler = async (req, res) => {
	switch (req.method) {
		case 'POST':

		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

export default checkAuth(avatarHandler);
