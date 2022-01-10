import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50,
	},
	coords: {
		lat: {
			type: Number,
			required: true,
		},
		lng: {
			type: Number,
			required: true,
		},
	},
	telephone: {
		type: String,
		maxlength: 20,
	},
	category: {
		type: String,
		required: true,
		maxlength: 50,
	},
	address: {
		type: String,
		required: true,
	},
	city: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'City',
	},
	photos: [
		//todo: convert to cdn urls
		{
			type: Object,
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
	popularityIndex: {
		type: Number,
		default: 0,
	},
});

const Place = mongoose.models.Place || mongoose.model('Place', placeSchema);

export default Place;
