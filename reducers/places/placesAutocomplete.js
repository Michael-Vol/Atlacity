import * as types from '../../actions/types';

const initialState = {
	places: null,
	isLoading: false,
	error: null,
};

const placesAutocomplete = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.PLACES_AUTOCOMPLETE_REQUEST:
			return {
				...state,
				places: null,
				error: null,
				isLoading: true,
			};
		case types.PLACES_AUTOCOMPLETE_SUCCESS:
			return {
				...state,
				isLoading: false,
				places: payload,
				error: null,
			};
		case types.PLACES_AUTOCOMPLETE_FAILURE:
			return {
				...state,
				isloading: false,
				places: null,
				error: payload,
			};
		default:
			return state;
	}
};

export default placesAutocomplete;
