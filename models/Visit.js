import mongoose from 'mongoose';
import { isDate } from 'validator';

const visitSchema = new mongoose.Schema({
	visitor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	place: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Place',
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},

	date: {
		type: Date,
		required: true,
		validate: {
			validator(value) {
				return isDate(value);
			},
		},
	},
	rating: {
		type: Number,
		required: true,
		validate: {
			validator(value) {
				return value >= 0 && value <= 5;
			},
		},
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Visit-Like',
		},
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Visit-Comment',
		},
	],
	isRecommended: {
		type: Boolean,
		default: false,
	},
});

const Visit = mongoose.models.Visit || mongoose.model('Visit', visitSchema);

export default Visit;
