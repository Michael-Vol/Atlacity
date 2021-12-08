import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
	{
		questions: [
			{
				type: String,
				required: [true, 'Question is required'],
			},
		],
		answers: [
			{
				type: String,
			},
		],
	},
	{
		timestamps: true,
	}
);

const Faq = mongoose.model('Faq', faqSchema);

export default Faq;
