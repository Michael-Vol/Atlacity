const checkUserAccess = (handler) => (req, res) => {
	if (!req.user._id.equals(req.query.userId)) {
		return res.status(403).json({
			status: 403,
			message: 'You are not authorized to perform this action',
		});
	}
	return handler(req, res);
};

export default checkUserAccess;
