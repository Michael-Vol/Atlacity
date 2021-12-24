import * as types from '../types';
import axios from 'axios';
const register = (registerData) => async (dispatch) => {
	try {
		dispatch({ type: types.REGISTER_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post('/api/auth/register', registerData, config);
		dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.REGISTER_FAILURE, payload: error });
	}
};

export const uploadProfile = (userId, profileData) => async (dispatch) => {
	try {
		dispatch({ type: types.UPLOAD_PROFILE_REQUEST });
		const res = await axios.post(`api/users/${userId}/profile`, profileData, {
			type: {
				'application/json': 'json',
			},
		});
		dispatch({ type: types.UPLOAD_PROFILE_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.UPLOAD_PROFILE_FAILURE, payload: error });
	}
};

export const uploadAvatar = (userId, imageURL) => async (dispatch) => {
	try {
		dispatch({ type: types.UPLOAD_AVATAR_REQUEST });
	} catch (error) {
		dispatch({ type: types.UPLOAD_AVATAR_FAILURE, payload: error });
	}
};

export default register;
