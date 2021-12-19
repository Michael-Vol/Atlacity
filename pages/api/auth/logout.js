import cookie from 'cookie';

const logout = (req, res) => {
	if (req.method === 'POST') {
		try {
			res.setHeader(
				'Set-Cookie',
				cookie.serialize('refreshToken', '', {
					httpOnly: true,
					maxAge: 0,
					path: '/',
				})
			);
			return res.status(200).json({
				message: 'Successfully logout',
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	} else {
		return res.status(405).json({
			message: 'Method not allowed',
		});
	}
};

export default logout;
