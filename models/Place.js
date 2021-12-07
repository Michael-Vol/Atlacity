import mongoose from 'mongoose';
import { isLatLong } from 'validator';

const placeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50,
	},
	location: {
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
	city: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'City',
		required: true,
	},
	images: [
		//todo: convert to cdn urls
		{
			type: Buffer,
		},
	],
	videos: [
		//todo:  convert to cdn urls
		{
			type: Buffer,
		},
	],
	mainPhoto: {
		type: Buffer,
	},
	visitors: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
		},
	],
	description: {
		type: String,
		maxlength: 1000,
	},
	faq: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Faq',
		},
	],
});

const Place = mongoose.model('Place', placeSchema);

export default Place;
