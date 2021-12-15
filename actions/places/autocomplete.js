import * as types from '../types';
import axios from 'axios';
import getEnv from '../../config/env';
export const placesAutocomplete =
	(place, limit = 3) =>
	async (dispatch) => {
		try {
			dispatch({ type: types.PLACES_AUTOCOMPLETE_REQUEST });
			const res = await axios.get(`/api/places/autocomplete?place=${place}&limit=${limit}`);
			console.log(res);
			dispatch({ type: types.PLACES_AUTOCOMPLETE_SUCCESS, payload: res.data.places });
		} catch (error) {
			console.log(error);
			dispatch({ type: types.PLACES_AUTOCOMPLETE_FAILURE, payload: error });
		}
	};
