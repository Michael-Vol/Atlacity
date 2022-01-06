import * as types from '../../actions/types';
import axios from 'axios';

const initialState = {
	search: {
		isLoading: false,
		error: null,
		results: [],
	},
	popular: {
		isLoading: false,
		error: null,
		results: [],
	},
	city: {
		isLoading: false,
		error: null,
		data: null,
	},
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.SEARCH_CITIES_REQUEST:
			return {
				...state,
				search: {
					...state.search,
					isLoading: true,
					error: null,
				},
			};
		case types.SEARCH_CITIES_SUCCESS:
			return {
				...state,
				search: {
					...state.search,
					isLoading: false,
					results: payload.cities,
					error: null,
				},
			};
		case types.SEARCH_CITIES_FAILURE:
			return {
				...state,
				search: {
					...state.search,
					isLoading: false,
					error: payload,
					results: [],
				},
			};
		case types.FETCH_POPULAR_CITIES_REQUEST:
			return {
				...state,
				popular: {
					...state.popular,
					isLoading: true,
					error: null,
				},
			};
		case types.FETCH_POPULAR_CITIES_SUCCESS:
			return {
				...state,
				popular: {
					...state.popular,
					isLoading: false,
					results: payload.cities,
					error: null,
				},
			};
		case types.FETCH_POPULAR_CITIES_FAILURE:
			return {
				...state,
				popular: {
					...state.popular,
					isLoading: false,
					error: payload,
					results: [],
				},
			};
		default:
			return state;
	}
};
