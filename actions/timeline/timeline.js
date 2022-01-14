import * as types from '../types';
import axios from 'axios';

export const getTimeline = (userId) => async (dispatch) => {
	dispatch({ type: types.FETCH_TIMELINE_REQUEST });
	try {
		const res = await axios.get(`/api/users/${userId}/timeline`);
		dispatch({ type: types.FETCH_TIMELINE_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.FETCH_TIMELINE_FAILURE, payload: error.response.data });
	}
};
