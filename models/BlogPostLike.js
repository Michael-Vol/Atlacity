import mongoose from 'mongoose';

const blogPostLikeSchema = new mongoose.Schema(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Creator is required'],
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

const BlogPostLike = mongoose.model('BlogPostLike', blogPostLikeSchema);

export default BlogPostLike;
