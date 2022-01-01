import * as types from '../types';
import axios from 'axios';
const register = (registerData) => async (dispatch) => {
	try {
		dispatch({ type: types.REGISTER_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post('/api/auth/register', registerData, config);
		dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.REGISTER_FAILURE, payload: error.response.data });
	}
};

export default register;
