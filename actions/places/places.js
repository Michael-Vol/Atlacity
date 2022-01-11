import * as types from '../types';
import axios from 'axios';

export const addPlace = (place) => async (dispatch) => {
	try {
		dispatch({ type: types.ADD_PLACE_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post('/api/places', place, config);
		dispatch({ type: types.ADD_PLACE_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.ADD_PLACE_FAILURE, payload: error.response.data });
	}
};

export const getPlace = (placeId) => async (dispatch) => {
	try {
		dispatch({ type: types.GET_PLACE_REQUEST });
		const res = await axios.get(`/api/places/${placeId}`);
		dispatch({ type: types.GET_PLACE_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.GET_PLACE_FAILURE, payload: error.response.data });
	}
};

export const getPlaceVisits = (placeId) => async (dispatch) => {
	try {
		dispatch({ type: types.GET_PLACE_VISITS_REQUEST });
		const res = await axios.get(`/api/places/${placeId}/visits`);
		dispatch({ type: types.GET_PLACE_VISITS_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.GET_PLACE_VISITS_FAILURE, payload: error.response.data });
	}
};

export const addVisit = (placeId, visit) => async (dispatch) => {
	try {
		dispatch({ type: types.ADD_VISIT_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'multipart-form-data',
			},
		};
		const res = await axios.post(`/api/places/${placeId}/visits`, visit, config);
		dispatch({ type: types.ADD_VISIT_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.ADD_VISIT_FAILURE, payload: error.response.data });
	}
};

export const searchPlaces =
	(name, limit = 5) =>
	async (dispatch) => {
		try {
			dispatch({ type: types.SEARCH_PLACES_REQUEST });
			const res = await axios.get(`/api/places/search?name=${name}&limit=${limit}`);
			dispatch({ type: types.SEARCH_PLACES_SUCCESS, payload: res.data });
		} catch (error) {
			dispatch({ type: types.SEARCH_PLACES_FAILURE, payload: error.message });
		}
	};

export const pinPlace = (placeId) => async (dispatch) => {
	try {
		dispatch({ type: types.PIN_PLACE_REQUEST });
		const res = await axios.post(`/api/places/${placeId}/pin`);
		dispatch({ type: types.PIN_PLACE_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.PIN_PLACE_FAILURE, payload: error.response.data });
	}
};

export const unpinPlace = (placeId) => async (dispatch) => {
	try {
		dispatch({ type: types.UNPIN_PLACE_REQUEST });
		const res = await axios.post(`/api/places/${placeId}/unpin`);
		dispatch({ type: types.UNPIN_PLACE_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.UNPIN_PLACE_FAILURE, payload: error.response.data });
	}
};

export const getPinnedPlaces = () => async (dispatch) => {
	try {
		dispatch({ type: types.FETCH_PINNED_PLACES_REQUEST });
		const res = await axios.get('/api/places/pinned');
		dispatch({ type: types.FETCH_PINNED_PLACES_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.FETCH_PINNED_PLACES_FAILURE, payload: error.response.data });
	}
};
