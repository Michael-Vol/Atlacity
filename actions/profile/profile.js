import * as types from '../types';
import axios from 'axios';

export const getProfile = (userId) => async (dispatch) => {
	try {
		dispatch({ type: types.FETCH_PROFILE_REQUEST });
		const res = await axios.get(`/api/users/${userId}/profile`);
		dispatch({ type: types.FETCH_PROFILE_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.FETCH_PROFILE_FAILURE, payload: error.message });
	}
};

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
		dispatch({ type: types.UPLOAD_PROFILE_FAILURE, payload: error.response.data });
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
		dispatch({ type: types.UPLOAD_AVATAR_FAILURE, payload: error.response.data });
	}
};

export const getAvatar = (userId) => async (dispatch) => {
	try {
		dispatch({ type: types.FETCH_AVATAR_REQUEST });
		const res = await axios.get(`/api/users/${userId}/avatar`);
		dispatch({ type: types.FETCH_AVATAR_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.FETCH_AVATAR_FAILURE, payload: error.response.data });
	}
};

export const getFavourites = (userId) => async (dispatch) => {
	try {
		dispatch({ type: types.FETCH_FAVOURITES_REQUEST });
		const res = await axios.get(`/api/users/${userId}/favourites`);
		dispatch({ type: types.FETCH_FAVOURITES_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.FETCH_FAVOURITES_FAILURE, payload: error.response.data });
	}
};

export const addFavourites = (userId, formData) => async (dispatch) => {
	try {
		dispatch({ type: types.ADD_FAVOURITES_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.patch(`/api/users/${userId}/favourites`, formData, config);

		dispatch({ type: types.ADD_FAVOURITES_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.ADD_FAVOURITES_FAILURE, payload: error.response.data });
	}
};
