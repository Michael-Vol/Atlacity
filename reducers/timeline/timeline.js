import * as types from '../../actions/types';

const initialState = {
	timeline: {
		isLoading: false,
		error: null,
		feedItems: [],
	},
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.FETCH_TIMELINE_REQUEST:
			return {
				...state,
				timeline: {
					...state.timeline,
					isLoading: true,
				},
			};
		case types.FETCH_TIMELINE_SUCCESS:
			return {
				...state,
				timeline: {
					...state.timeline,
					isLoading: false,
					feedItems: payload.timeline.feedItems,
				},
			};
		case types.FETCH_TIMELINE_FAILURE:
			return {
				...state,
				timeline: {
					...state.timeline,
					isLoading: false,
					error: payload,
				},
			};
		default:
			return state;
	}
};
