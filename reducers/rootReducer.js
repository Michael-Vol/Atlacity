import { combineReducers } from 'redux';
import auth from './auth/auth';
import placesAutocomplete from './places/placesAutocomplete';
import emailVerification from './auth/emailVerification';
import profile from './profile/profile';
import cities from './cities/cities';
const appReducer = combineReducers({ auth, placesAutocomplete, emailVerification, profile, cities });

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
