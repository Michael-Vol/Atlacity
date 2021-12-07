import mongoose from 'mongoose';
import { isLatLong } from 'validator';
const userProfileSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		photo: {
			type: Buffer,
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
			type: [
				{
					type: Number,
					required: true,
					validate: {
						validator(value) {
							//check that coordinates are valid
							return isLatLong(value);
						},
					},
				},
			], //custom validation for coordinates array length
			validate: [(val) => val.length == 2, `Coordinates array must have exactly 2 elements`],
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

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
