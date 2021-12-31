import checkAuth from '../../../lib/middleware/checkAuth';

const meHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			try {
				return res.json({
					user: req.user,
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

export default checkAuth(meHandler);
