import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		removedUsers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		avatar: {
			buffer: {
				type: Buffer,
			},
			imageType: {
				type: String,
			},
		},
		backgroundImage: {
			type: 'String',
			default: 'none',
		},
		about: {
			type: String,
			maxlength: 1000,
		},
		visits: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Visit',
			},
		],
		currentLocation: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'City',
			required: true,
		},
		favouritePlaces: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Place',
			},
		],
		favouriteCities: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'City',
			},
		],
		blog: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog',
		},
	},
	{
		timestamps: true,
	}
);

const UserProfile = mongoose.models.UserProfile || mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
