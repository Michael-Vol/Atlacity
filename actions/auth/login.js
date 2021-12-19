import * as types from '../types';
import axios from 'axios';

const login = (loginData) => async (dispatch) => {
	try {
		dispatch({ type: types.LOGIN_REQUEST });
		const res = await axios.post('/api/auth/login', loginData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.LOGIN_FAILURE, payload: error });
	}
};

export const refreshToken = () => async (dispatch) => {
	try {
		dispatch({ type: types.REFRESH_TOKEN_REQUEST });
		const res = await axios.post('/api/auth/refresh_token');
		dispatch({ type: types.REFRESH_TOKEN_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.REFRESH_TOKEN_FAILURE, payload: error });
	}
};

export default login;
