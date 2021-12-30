import * as types from '../../actions/types';

const initialState = {
	isLoading: false,
	error: false,
	message: null,
	verified: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'VERIFY_EMAIL_REQUEST':
			return {
				...state,
				isLoading: true,
			};
		case 'VERIFY_EMAIL_SUCCESS':
			return {
				...state,
				isLoading: false,
				error: null,
				verified: payload.verified,
				message: payload.message,
			};
		case 'VERIFY_EMAIL_FAILURE':
			return {
				...state,
				isLoading: false,
				error: payload.error,
				verified: false,
				message: payload.message,
			};
		default:
			return state;
	}
};
