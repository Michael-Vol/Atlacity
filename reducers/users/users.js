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
		case types.FOLLOW_USER_REQUEST:
			return {
				...state,
				follow: {
					...state.follow,
					isLoading: true,
					error: null,
				},
			};
		case types.FOLLOW_USER_SUCCESS:
			return {
				...state,
				follow: {
					...state.follow,
					isLoading: false,
					error: null,
					isFollowed: true,
				},
			};
		case types.FOLLOW_USER_FAILURE:
			return {
				...state,
				follow: {
					...state.follow,
					isLoading: false,
					error: payload,
					isFollowed: false,
				},
			};
		case types.UNFOLLOW_USER_REQUEST:
			return {
				...state,
				unfollow: {
					...state.unfollow,
					isLoading: true,
					error: null,
				},
			};
		case types.UNFOLLOW_USER_SUCCESS:
			return {
				...state,
				unfollow: {
					...state.unfollow,
					isLoading: false,
					error: null,
					isUnfollowed: true,
				},
			};
		case types.UNFOLLOW_USER_FAILURE:
			return {
				...state,
				unfollow: {
					...state.unfollow,
					isLoading: false,
					error: payload,
					isUnfollowed: false,
				},
			};
		default:
			return state;
	}
};
