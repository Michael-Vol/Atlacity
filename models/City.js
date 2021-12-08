import mongoose from 'mongoose';
import { isLatLong } from 'validator';

const citySchema = new mongoose.Schema({
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
	visitors: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
		},
	],
	photo: [
		{
			type: Buffer,
		},
	],
});

const City = mongoose.model('City', citySchema);

export default City;
