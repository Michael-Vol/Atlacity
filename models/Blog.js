import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
	{
		creator: {
			type: mongoose.schema.Types.ObjectId,
			required: true,
		},
		description: {
			type: String,
			maxlength: 1000,
		},
		posts: [
			{
				type: mongoose.schema.Types.ObjectId,
				ref: 'Post',
			},
		],
	},
	{
		timestamps: true,
	}
);

const blogSchema = mongoose.model('Blog', blogSchema);

export default blogSchema;
