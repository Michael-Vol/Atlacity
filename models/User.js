import mongoose from 'mongoose';
import { isEmail, isDate } from 'validator';
const userScema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			maxlength: 50,
		},
		lastName: {
			type: String,
			required: true,
			maxlength: 50,
		},
		email: {
			type: String,
			required: true,
			validate: {
				//custom validation for email field
				validator(value) {
					return isEmail(value);
				},
				message: (props) => `${props.value} is not a valid email!`,
			},
		},
		dateOfBirth: {
			type: Date,
			required: true,
			validate: {
				//custom validation for dateOfBirth field
				validator(value) {
					return isDate(value);
				},
				message: (props) => `${props.value} is not a valid date!`,
			},
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		password: {
			type: String,
			required: true,
			minlength: 7,
		},
	},
	{
		timestamps: true,
	}
);

userScema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.photo;

	return userObject;
};

export default mongoose.models.User || mongoose.model('User', userScema);
