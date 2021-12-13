import * as types from '../types';
import axios from 'axios';
const register = (registerData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post('/api/users/register', registerData, config);
		dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: types.REGISTER_FAILURE, payload: error });
	}
};

export default register;
