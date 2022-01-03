import mongoose from 'mongoose';
import { isLatLong } from 'validator';

const citySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50,
	},
	locationId: {
		type: String,
		required: true,
	},
	visitors: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
		},
	],
	photos: {
		type: Object,
	},
});

const City = mongoose.models.City || mongoose.model('City', citySchema);

export default City;
