import * as types from '../../actions/types';

const initialState = {
	suggested: {
		isLoading: false,
		users: [],
		error: null,
	},
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.GET_SUGGESTED_USERS_REQUEST:
			return {
				...state,
				suggested: {
					...state.suggested,
					isLoading: true,
					error: null,
				},
			};
		case types.GET_SUGGESTED_USERS_SUCCESS:
			return {
				...state,
				suggested: {
					...state.suggested,
					isLoading: false,
					users: payload.users,
					error: null,
				},
			};
		case types.GET_SUGGESTED_USERS_FAILURE:
			return {
				...state,
				suggested: {
					...state.suggested,
					isLoading: false,
					users: [],
					error: payload,
				},
			};

		default:
			return state;
	}
};
