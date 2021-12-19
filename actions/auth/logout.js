import * as types from '../types';
import axios from 'axios';

const logout = () => async (dispatch) => {
	try {
		dispatch({ type: types.LOGOUT_REQUEST });
		const res = await axios.post('/api/auth/logout');
		dispatch({ type: types.LOGOUT_SUCCESS, payload: res.data });
	} catch (error) {
		return dispatch({ type: types.LOGOUT_FAILURE, payload: error });
	}
};

export default logout;
