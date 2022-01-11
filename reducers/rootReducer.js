import { combineReducers } from 'redux';
import auth from './auth/auth';
import places from './places/places';
import placesAutocomplete from './places/placesAutocomplete';
import emailVerification from './auth/emailVerification';
import profile from './profile/profile';
import cities from './cities/cities';
import users from './users/users';
import { LOGOUT_SUCCESS } from '../actions/types';

const appReducer = combineReducers({
	auth,
	placesAutocomplete,
	emailVerification,
	profile,
	cities,
	places,
	users,
});

const rootReducer = (state, action) => {
	if (action.type === LOGOUT_SUCCESS) {
		return appReducer(undefined, action);
	}
	return appReducer(state, action);
};

export default rootReducer;
