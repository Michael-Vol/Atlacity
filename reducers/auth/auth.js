import * as types from '../../actions/types';

const initialState = {
	isLoading: false,
	error: null,
	user: null,
	message: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.REGISTER_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case types.REGISTER_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				user: payload.user,
				message: payload.message,
			};
		case types.REGISTER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload,
				user: null,
			};
		default: {
			return state;
		}
	}
};
