import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	blog: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog',
		required: true,
	},
	title: {
		type: String,
		maxlength: [100, 'Title must be less than 100 characters'],
		required: [true, 'Title is required'],
	},
	subtitle: {
		type: String,
		maxlength: [200, 'Subtitle must be less than 200 characters'],
	},
	body: {
		type: String,
		required: [true, 'Post Body is required'],
	},
	mainPhoto: {
		type: Buffer,
	},
	photos: [
		//todo convert to cdn links
		{
			type: Buffer,
		},
	],
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
