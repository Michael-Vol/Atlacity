import * as types from '../../actions/types';

const initialState = {
	profile: {
		isLoading: null,
		error: null,
		message: null,
		profile: null,
	},
	avatar: {
		isLoading: null,
		error: null,
		message: null,
		avatar: null,
		avatarUploaded: null,
	},
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.FETCH_PROFILE_REQUEST:
		case types.UPLOAD_PROFILE_REQUEST:
			return {
				...state,
				profile: {
					...state.profile,
					isLoading: true,
				},
			};
		case types.UPLOAD_AVATAR_REQUEST:
		case types.FETCH_AVATAR_REQUEST: {
			return {
				...state,
				avatar: {
					...state.avatar,
					isLoading: true,
				},
			};
		}
		case types.ADD_FAVOURITES_REQUEST:
			return {
				...state,
				favourites: {
					...state.favourites,
					isLoading: true,
				},
			};
		case types.UPLOAD_PROFILE_SUCCESS:
		case types.FETCH_PROFILE_SUCCESS: {
			return {
				...state,
				profile: {
					...state.profile,
					isLoading: false,
					error: null,
					message: payload.message,
					profile: payload.profile,
				},
			};
		}
		case types.FETCH_PROFILE_FAILURE:
		case types.UPLOAD_PROFILE_FAILURE:
			return {
				...state,
				profile: {
					...state.profile,
					isLoading: false,
					error: payload,
					message: null,
					profile: null,
				},
			};
		case types.UPLOAD_AVATAR_SUCCESS:
			return {
				...state,
				avatar: {
					...state.avatar,
					isLoading: false,
					error: null,
					message: payload.message,
					avatarUploaded: true,
				},
			};
		case types.UPLOAD_AVATAR_FAILURE:
			return {
				...state,
				avatar: {
					...state.avatar,
					isLoading: false,
					error: payload,
					message: null,
					avatarUploaded: false,
				},
			};
		case types.FETCH_AVATAR_SUCCESS:
			return {
				...state,
				avatar: {
					...state.avatar,
					isLoading: false,
					error: null,
					avatar: payload,
				},
			};
		case types.FETCH_AVATAR_FAILURE:
			return {
				...state,
				avatar: {
					...state.avatar,
					isLoading: false,
					error: payload,
					avatar: null,
				},
			};
		case types.ADD_FAVOURITES_SUCCESS:
			return {
				...state,
				profile: {
					...state.profile,
					profile: {
						...state.profile.profile,
						favouriteCities: payload.favouriteCities,
						favouritePlaces: payload.favouritePlaces,
					},
				},
			};
		case types.ADD_FAVOURITES_FAILURE:
			return {
				...state,
				profile: {
					...state.profile,
					error: payload,
					message: null,
				},
			};
		default:
			return state;
	}
};
