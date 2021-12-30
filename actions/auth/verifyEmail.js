import * as types from '../types';
import axios from 'axios';

export const verifyEmail = (verificationCode) => async (dispatch) => {
	try {
		dispatch({ type: types.VERIFY_EMAIL_REQUEST });
		const res = await axios.post('/api/auth/email_verify', verificationCode);
		dispatch({ type: types.VERIFY_EMAIL_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({
			type: types.VERIFY_EMAIL_FAILURE,
			payload: error,
		});
	}
};
