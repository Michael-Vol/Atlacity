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

export const followUser = (userId) => async (dispatch) => {
	try {
		dispatch({ type: types.FOLLOW_USER_REQUEST });
		const res = await axios.post(`/api/users/${userId}/follow`);
		dispatch({ type: types.FOLLOW_USER_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.FOLLOW_USER_FAILURE, payload: error.response.data });
	}
};

export const unfollowUser = (userId) => async (dispatch) => {
	try {
		dispatch({ type: types.UNFOLLOW_USER_REQUEST });
		const res = await axios.post(`/api/users/${userId}/unfollow`);
		dispatch({ type: types.UNFOLLOW_USER_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.UNFOLLOW_USER_FAILURE, payload: error.response.data });
	}
};

export const getConnectUsers = () => async (dispatch) => {
	try {
		dispatch({ type: types.CONNECT_USERS_REQUEST });
		const res = await axios.get('/api/users/connect');
		dispatch({ type: types.CONNECT_USERS_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.CONNECT_USERS_FAILURE, payload: error.response.data });
	}
};

export const searchUsers = (searchTerm) => async (dispatch) => {
	try {
		dispatch({ type: types.SEARCH_USERS_REQUEST });
		const res = await axios.get(`/api/users/search?name=${searchTerm}`);
		dispatch({ type: types.SEARCH_USERS_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.SEARCH_USERS_FAILURE, payload: error.response.data });
	}
};
