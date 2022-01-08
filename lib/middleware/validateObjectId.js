import Mongoose from 'mongoose';

const validateObjectId = (handler, idName) => async (req, res) => {
	if (!Mongoose.Types.ObjectId.isValid(req.query[idName])) {
		return res.status(400).json({
			message: 'Invalid ID',
		});
	}
	return handler(req, res);
};

export default validateObjectId;
