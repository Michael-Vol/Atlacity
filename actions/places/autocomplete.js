import * as types from '../types';
import axios from 'axios';

export const placesAutocomplete =
	(place, limit = 3) =>
	async (dispatch) => {
		try {
			dispatch({ type: types.PLACES_AUTOCOMPLETE_REQUEST });

			const res = await axios.get(
				`https://api.geoapify.com/v1/geocode/autocomplete?text=${place}&limit=${limit}&apiKey=21cba6e153c142b3bfbe2dae209824f5`
			);
			dispatch({ type: types.PLACES_AUTOCOMPLETE_SUCCESS, payload: res.data.features });
		} catch (error) {
			dispatch({ type: types.PLACES_AUTOCOMPLETE_FAILURE, payload: error });
		}
	};
