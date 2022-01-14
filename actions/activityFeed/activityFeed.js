import * as types from '../types';
import axios from 'axios';

export const getActivityFeed =
	(limit = 10, skip = 0) =>
	async (dispatch) => {
		try {
			dispatch({ type: types.FETCH_ACTIVITY_FEED_REQUEST });
			const res = await axios.get(`/api/activity-feed?limit=${limit}&skip=${skip}`);
			dispatch({ type: types.FETCH_ACTIVITY_FEED_SUCCESS, payload: res.data });
		} catch (error) {
			dispatch({ type: types.FETCH_ACTIVITY_FEED_FAILURE, payload: error.response.data });
		}
	};
