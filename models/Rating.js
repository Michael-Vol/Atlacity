import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
	score: {
		type: Number,
		required: true,
		validate: {
			validator(value) {
				//check that score is valid (between 1 and 10)
				return value >= 0 && value <= 10;
			},
		},
	},
	description: {
		type: String,
		maxlength: 1000,
	},
	visit: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Visit',
		required: true,
	},
	creator: {
		type: mongoose.schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
