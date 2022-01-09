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
