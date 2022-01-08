import * as types from '../../actions/types';

const initialState = {
	place: {
		isLoading: false,
		placeUploaded: false,
		error: null,
		place: null,
		message: null,
	},
};

const places = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.ADD_PLACE_REQUEST:
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
					place: payload.place,
					message: payload.message,
					placeUploaded: true,
					error: null,
				},
			};
		case types.ADD_PLACE_FAILURE:
			return {
				...state,
				place: {
					...state.place,
					isLoading: false,
					error: payload,
				},
			};

		default:
			return state;
	}
};

export default places;
