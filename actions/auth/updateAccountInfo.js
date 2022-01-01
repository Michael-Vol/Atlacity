import * as types from '../types';
import axios from 'axios';

export const updateAccountInfo = (formData) => async (dispatch) => {
	try {
		dispatch({ type: types.UPDATE_ACCOUNT_INFO_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.patch('/api/users/me', formData, config);
		dispatch({ type: types.UPDATE_ACCOUNT_INFO_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.UPDATE_ACCOUNT_INFO_FAILURE, payload: error });
	}
};
