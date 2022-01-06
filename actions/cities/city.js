import * as types from '../types';
import axios from 'axios';

export const searchCities =
	(name, limit = 5) =>
	async (dispatch) => {
		try {
			dispatch({ type: types.SEARCH_CITIES_REQUEST });
			const res = await axios.get(`/api/cities/search?name=${name}&limit=${limit}`);
			dispatch({ type: types.SEARCH_CITIES_SUCCESS, payload: res.data });
		} catch (error) {
			dispatch({ type: types.SEARCH_CITIES_FAILURE, payload: error.message });
		}
	};

export const getPopularCities =
	(limit = 4) =>
	async (dispatch) => {
		try {
			dispatch({ type: types.FETCH_POPULAR_CITIES_REQUEST });
			const res = await axios.get(`/api/cities/popular?limit=${limit}`);
			dispatch({ type: types.FETCH_POPULAR_CITIES_SUCCESS, payload: res.data });
		} catch (error) {
			dispatch({ type: types.FETCH_POPULAR_CITIES_FAILURE, payload: error.message });
		}
	};
