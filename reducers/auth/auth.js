import * as types from '../../actions/types';

const initialState = {
	isLoading: false,
	isAuthenticated: false,
	error: null,
	user: null,
	message: null,
	accessToken: null,
	profile: null,
	avatar: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.LOGOUT_REQUEST:
		case types.REFRESH_TOKEN_REQUEST:
		case types.LOGIN_REQUEST:
		case types.REGISTER_REQUEST:
		case types.UPLOAD_PROFILE_REQUEST:
		case types.UPLOAD_AVATAR_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case types.REFRESH_TOKEN_SUCCESS:
		case types.LOGIN_SUCCESS:
		case types.REGISTER_SUCCESS:
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
		case types.LOGOUT_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
				error: null,
				user: null,
				accessToken: null,
				message: payload.message,
			};
		case types.UPLOAD_PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				message: payload.message,
				profile: payload.profile,
			};
		case types.UPLOAD_PROFILE_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload,
				message: null,
				profile: null,
			};
		case types.UPLOAD_AVATAR_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				message: payload.message,
				avatarUploaded: payload.avatarUploaded,
			};
		case types.UPLOAD_AVATAR_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload,
				message: null,
				avatarUploaded: payload.avatarUploaded,
			};
		default: {
			return state;
		}
	}
};
