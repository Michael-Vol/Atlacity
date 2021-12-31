const checkUserAccess = (handler, options) => (req, res) => {
	if (options.methods.includes(req.method)) {
		if (!req.user._id.equals(req.query.userId)) {
			console.log('Not authorized to perform this action');
			return res.status(403).json({
				status: 403,
				message: 'You are not authorized to perform this action',
			});
		}
	}
	return handler(req, res);
};

export default checkUserAccess;
