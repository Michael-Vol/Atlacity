import * as types from '../../actions/types';

const initialState = {
	place: {
		isLoading: false,
		error: null,
		place: null,
		message: null,
		placeLoaded: false,
	},
};

const places = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.ADD_PLACE_REQUEST:
		case types.GET_PLACE_REQUEST:
			return {
				...state,
				place: {
					...state.place,
					isLoading: true,
				},
			};
		case types.ADD_PLACE_SUCCESS:
			return {
				...state,
				place: {
					...state.place,
					isLoading: false,
					message: payload.message,
					error: null,
				},
			};
		case types.GET_PLACE_SUCCESS:
			return {
				...state,
				place: {
					...state.place,
					isLoading: false,
					place: payload.place,
					placeLoaded: true,
					error: null,
				},
			};
		case types.GET_PLACE_FAILURE:
		case types.ADD_PLACE_FAILURE:
			return {
				...state,
				place: {
					...state.place,
					isLoading: false,
					error: payload,
					place: null,
				},
			};

		default:
			return state;
	}
};

export default places;
