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
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Rating',
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

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;
