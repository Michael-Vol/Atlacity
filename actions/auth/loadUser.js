import * as types from '../types';
import axios from 'axios';

export const loadUser = () => async (dispatch) => {
	try {
		if (localStorage.getItem('accessToken')) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
		}
		dispatch({ type: types.LOAD_USER_REQUEST });
		const res = await axios.get('/api/users/me');
		dispatch({ type: types.LOAD_USER_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.LOAD_USER_FAILURE, payload: error });
	}
};
