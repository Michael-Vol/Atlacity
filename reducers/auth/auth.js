import * as types from '../../actions/types';
import axios from 'axios';
const initialState = {
	isLoading: false,
	isAuthenticated: null,
	error: null,
	user: null,
	message: null,
	accessToken: null,
	profile: null,
	avatarUploaded: false,
	userUpdated: null,
	passwordUpdated: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.LOGOUT_REQUEST:
		case types.REFRESH_TOKEN_REQUEST:
		case types.LOGIN_REQUEST:
		case types.REGISTER_REQUEST:
		case types.LOAD_USER_REQUEST:
		case types.UPDATE_ACCOUNT_INFO_REQUEST:
		case types.UPDATE_PASSWORD_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case types.REFRESH_TOKEN_SUCCESS:
		case types.LOGIN_SUCCESS:
		case types.LOAD_USER_SUCCESS:
		case types.REGISTER_SUCCESS:
			axios.defaults.headers.common['Authorization'] = `Bearer ${payload.accessToken}`;
			localStorage.setItem('accessToken', payload.accessToken);
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				error: null,
				user: payload.user,
				message: payload.message,
				accessToken: payload.accessToken,
			};
		case types.LOGOUT_FAILURE:
		case types.REFRESH_TOKEN_FAILURE:
		case types.LOGIN_FAILURE:
		case types.REGISTER_FAILURE:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
				error: payload,
				message: null,
				user: null,
				accessToken: null,
			};
		case types.LOAD_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
				message: null,
				user: null,
				accessToken: null,
			};
		case types.LOGOUT_SUCCESS:
			localStorage.removeItem('accessToken');

			return state;
		case types.UPDATE_ACCOUNT_INFO_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				message: payload.message,
				user: payload.user,
				userUpdated: payload.isUpdated,
			};
		case types.UPDATE_ACCOUNT_INFO_FAILURE:
			return {
				...state,
				isLoading: false,
				message: null,
				userUpdated: payload.isUpdated,
			};
		case types.UPDATE_PASSWORD_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				message: payload.message,
				passwordUpdated: payload.passwordUpdated,
			};
		case types.UPDATE_PASSWORD_FAILURE:
			return {
				...state,
				isLoading: false,
				message: payload.message,
				passwordUpdated: payload.passwordUpdated,
			};
		default: {
			return state;
		}
	}
};
