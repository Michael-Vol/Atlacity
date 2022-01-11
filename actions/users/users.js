import * as types from '../types';
import axios from 'axios';

export const getSuggestedUsers = () => async (dispatch) => {
	try {
		dispatch({ type: types.GET_SUGGESTED_USERS_REQUEST });
		const res = await axios.get('/api/users/suggested');
		dispatch({ type: types.GET_SUGGESTED_USERS_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.GET_SUGGESTED_USERS_FAILURE, payload: error.response.data });
	}
};
