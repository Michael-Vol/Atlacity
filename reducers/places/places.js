import * as types from '../../actions/types';

const initialState = {
	place: {
		isLoading: false,
		error: null,
		place: null,
		message: null,
		placeLoaded: false,
	},
	visits: {
		isLoading: false,
		error: null,
		visits: [],
		visitsLoaded: false,
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
					place: payload.place,
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
					placeLoaded: false,
				},
			};
		case types.GET_PLACE_VISITS_REQUEST:
		case types.ADD_VISIT_REQUEST:
			return {
				...state,
				visits: {
					...state.visits,
					isLoading: true,
				},
			};
		case types.GET_PLACE_VISITS_SUCCESS:
		case types.ADD_VISIT_SUCCESS:
			return {
				...state,
				visits: {
					...state.visits,
					isLoading: false,
					visits: payload.visits,
					error: null,
					visitsLoaded: true,
				},
			};
		case types.GET_PLACE_VISITS_FAILURE:
		case types.ADD_VISIT_FAILURE:
			return {
				...state,
				visits: {
					...state.visits,
					isLoading: false,
					error: payload,
					visits: [],
				},
			};

		default:
			return state;
	}
};

export default places;
