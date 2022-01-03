import * as types from '../types';
import axios from 'axios';

export const fetchCityPhoto = (cityName) => async (dispatch) => {
	try {
		dispatch({ type: types.FETCH_CITY_PHOTO_REQUEST });
		// const { data } = await axios.get(
		// 	`https://api.unsplash.com/search/photos?page=1&query=${cityName}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
		// );
	} catch (error) {
		dispatch({ type: types.FETCH_CITY_PHOTO_FAILURE, payload: error.response.data });
	}
};
