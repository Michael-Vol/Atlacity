import { combineReducers } from 'redux';
import auth from './auth/auth';
import placesAutocomplete from './places/placesAutocomplete';
import emailVerification from './auth/emailVerification';
const rootReducer = combineReducers({ auth, placesAutocomplete, emailVerification });

export default rootReducer;
