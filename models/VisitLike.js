import mongoose from 'mongoose';

const visitLikeSchema = new mongoose.Schema(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		rating: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Rating',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const VisitLike = mongoose.model('VisitLike', visitLikeSchema);

export default VisitLike;
