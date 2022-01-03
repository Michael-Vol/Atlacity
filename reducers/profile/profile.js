import * as types from '../../actions/types';
import axios from 'axios';

const initialState = {
	isLoading: false,
	error: null,
	message: null,
	profile: null,
	avatarUploaded: false,
	avatarFetched: false,
	avatar: null,
	favouritesUpdated: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.UPLOAD_PROFILE_REQUEST:
		case types.UPLOAD_AVATAR_REQUEST:
		case types.FETCH_AVATAR_REQUEST:
		case types.FETCH_FAVOURITES_REQUEST:
		case types.ADD_FAVOURITES_REQUEST:
			return {
				...state,
				isLoading: true,
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
				avatarUploaded: false,
			};
		case types.FETCH_AVATAR_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				avatar: payload,
				avatarFetched: true,
			};
		case types.FETCH_AVATAR_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload,
				avatar: null,
				avatarFetched: false,
			};
		case types.FETCH_FAVOURITES_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				profile: {
					...state.profile,
					favouritePlaces: payload.favouritePlaces,
					favouriteCities: payload.favouriteCities,
				},
			};
		case types.FETCH_FAVOURITES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload,
				message: payload.message,
			};

		case types.ADD_FAVOURITES_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				message: payload.message,
				profile: payload.profile,
				favouritesUpdated: true,
			};
		case types.ADD_FAVOURITES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload,
				message: payload.message,
				favouritesUpdated: false,
			};
		default:
			return state;
	}
};
