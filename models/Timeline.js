import mongoose from 'mongoose';

const TimelineSchema = new mongoose.Schema({
	feedItems: [
		{
			modelType: {
				type: String,
			},
			itemType: {
				type: String,
				required: true,
				enum: ['add-place', 'add-visit', 'comment', 'like', 'follow', 'pinned-place'],
			},
			item: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				refPath: 'feedItems.modelType',
			},
			itemCreator: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'User',
			},
		},
	],
});

const Timeline = mongoose.models.Timeline || mongoose.model('Timeline', TimelineSchema);

export default Timeline;
