import * as types from '../types';
import axios from 'axios';

export const uploadProfile = (profileData, userId) => async (dispatch) => {
	try {
		dispatch({ type: types.UPLOAD_PROFILE_REQUEST });
		const res = await axios.post(`/api/users/${userId}/profile`, profileData, {
			type: {
				'application/json': 'json',
			},
		});
		dispatch({ type: types.UPLOAD_PROFILE_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.UPLOAD_PROFILE_FAILURE, payload: error });
	}
};

export const uploadAvatar = (image, userId) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};

		const formData = new FormData();
		formData.append('avatar', image);

		dispatch({ type: types.UPLOAD_AVATAR_REQUEST });

		const res = await axios.post(`/api/users/${userId}/avatar`, formData, config);
		dispatch({ type: types.UPLOAD_AVATAR_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.UPLOAD_AVATAR_FAILURE, payload: error });
	}
};

export const getAvatar = (userId) => async (dispatch) => {
	try {
	} catch (error) {
		dispatch({ type: types.UPLOAD_AVATAR_FAILURE, payload: error });
	}
};
