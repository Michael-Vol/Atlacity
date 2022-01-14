import connectToDB from '../../../../lib/db';
import checkAuth from '../../../../lib/middleware/checkAuth';
import User from '../../../../models/User';
import UserProfile from '../../../../models/UserProfile';
import Place from '../../../../models/Place';
import Visit from '../../../../models/Visit';
import City from '../../../../models/City';
import Timeline from '../../../../models/Timeline';
import validateObjectId from '../../../../lib/middleware/validateObjectId';

const TimelineHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			try {
				await connectToDB();
				//get user's profile
				const profile = await UserProfile.findOne({ user: req.query.userId }).populate('user');

				const feedItems = [];
				let { limit = 10, skip = 0 } = req.query;
				limit = parseInt(limit);
				skip = parseInt(skip);

				//get most recent places added by user or user's following users
				const places = await Place.find({
					creator: req.query.userId,
				})
					.select('-photos')
					.sort({ createdAt: -1 })
					.skip(skip)
					.limit(limit);

				//add places to feedItems
				for (let place of places) {
					feedItems.push({
						itemType: 'add-place',
						item: place._id,
						itemCreator: place.creator,
						modelType: 'Place',
					});
				}

				//get most recent visits created by user or user's following sers
				const visits = await Visit.find({
					visitor: req.query.userId,
				})
					.sort({ createdAt: -1 })
					.limit(limit)
					.skip(skip);
				//add visits to feedItems
				for (let visit of visits) {
					feedItems.push({
						itemType: 'add-visit',
						item: visit._id,
						itemCreator: visit.visitor,
						modelType: 'Visit',
					});
				}

				//get most recent pinned places created by user or user's following users

				const pinnedPlaces = await Place.find({
					_id: { $in: profile.favouritePlaces },
				})
					.select('-photos')
					.sort({ createdAt: -1 })
					.skip(skip)
					.limit(limit);

				//add pinned places to feedItems
				for (let pinnedPlace of pinnedPlaces) {
					feedItems.push({
						itemType: 'pinned-place',
						item: pinnedPlace._id,
						itemCreator: pinnedPlace.creator,
						modelType: 'Place',
					});
				}
				let activityFeed = new Timeline({
					feedItems,
				});

				await activityFeed.populate({
					path: 'feedItems',
					populate: [
						{
							path: 'item',
							select: '-photos',
						},
						{
							path: 'itemCreator',
						},
					],
				});

				activityFeed.feedItems = await Promise.all(
					activityFeed.feedItems.map(async (feedItem) => {
						const { item, itemCreator, itemType, modelType } = feedItem;
						const populateField = selectItemPopulateField(itemType);
						if (populateField) {
							await item.populate({ path: populateField, select: '-photos' });
						}
						return {
							item,
							itemCreator,
							itemType,
							modelType,
						};
					})
				);

				return res.json({
					activityFeed,
				});
			} catch (error) {
				console.log(error);
				return res.status(500).json({
					message: 'Something went wrong',
				});
			}
		default:
			return res.status(405).json({ message: 'Invalid HTTP Method' });
	}
};

const selectItemPopulateField = (itemType) => {
	switch (itemType) {
		case 'add-place':
			return 'city';
		case 'add-visit':
			return 'place';
		case 'pinned-place':
			return 'city';
		default:
			return null;
	}
};

export default checkAuth(validateObjectId(TimelineHandler, 'userId'));
