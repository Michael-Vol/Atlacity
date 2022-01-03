import { combineReducers } from 'redux';
import auth from './auth/auth';
import placesAutocomplete from './places/placesAutocomplete';
import emailVerification from './auth/emailVerification';
import profile from './profile/profile';
const appReducer = combineReducers({ auth, placesAutocomplete, emailVerification, profile });

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
