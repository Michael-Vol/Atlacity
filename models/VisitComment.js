import mongoose from 'mongoose';

const visitCommentSchema = new mongoose.Schema(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		body: {
			type: String,
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

const VisitComment = mongoose.model('VisitComment', visitCommentSchema);

export default VisitComment;
