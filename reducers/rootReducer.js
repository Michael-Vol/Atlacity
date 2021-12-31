import { combineReducers } from 'redux';
import auth from './auth/auth';
import placesAutocomplete from './places/placesAutocomplete';
import emailVerification from './auth/emailVerification';
import profile from './profile/profile';

const rootReducer = combineReducers({ auth, placesAutocomplete, emailVerification, profile });

export default rootReducer;
