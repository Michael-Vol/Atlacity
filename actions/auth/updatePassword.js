import * as types from '../types';
import axios from 'axios';

export const updatePassword = (formData) => async (dispatch) => {
	try {
		dispatch({ type: types.UPDATE_PASSWORD_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post('/api/auth/changePassword', formData, config);
		dispatch({ type: types.UPDATE_PASSWORD_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.UPDATE_PASSWORD_FAILURE, payload: error.response.data });
	}
};
