import * as types from '../../actions/types';

const initialState = {
	feed: {
		isLoading: false,
		error: null,
		feedItems: [],
	},
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.FETCH_ACTIVITY_FEED_REQUEST:
			return {
				...state,
				feed: {
					...state.feed,
					isLoading: true,
				},
			};
		case types.FETCH_ACTIVITY_FEED_SUCCESS:
			return {
				...state,
				feed: {
					...state.feed,
					isLoading: false,
					feedItems: payload.activityFeed.feedItems,
				},
			};
		case types.FETCH_ACTIVITY_FEED_FAIL:
			return {
				...state,
				feed: {
					...state.feed,
					isLoading: false,
					error: payload,
				},
			};
		default:
			return state;
	}
};
