import * as types from '../../actions/types';

const initialState = {
	isLoading: false,
	error: null,
	user: null,
	message: null,
	accessToken: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.REFRESH_TOKEN_REQUEST:
		case types.LOGIN_REQUEST:
		case types.REGISTER_REQUEST:
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
				error: null,
				user: payload.user,
				message: payload.message,
				accessToken: payload.accessToken,
			};
		case types.REFRESH_TOKEN_FAILURE:
		case types.LOGIN_FAILURE:
		case types.REGISTER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload,
				user: null,
				accessToken: null,
			};
		default: {
			return state;
		}
	}
};
