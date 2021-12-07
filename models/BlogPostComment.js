import mongoose from 'mongoose';

const BlogPostComment = new mongoose.Schema(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Creator is required'],
		},
		body: {
			type: String,
			required: [true, 'Body is required'],
		},
		blogPost: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'BlogPost',
			required: [true, 'BlogPost is required'],
		},
	},
	{
		timestamps: true,
	}
);

const BlogPostComment = mongoose.model('BlogPostComment', BlogPostComment);

export default BlogPostComment;
