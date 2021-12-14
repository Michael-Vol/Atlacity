import { combineReducers } from 'redux';
import auth from './auth/auth';
import placesAutocomplete from './places/placesAutocomplete';
const rootReducer = combineReducers({ auth, placesAutocomplete });

export default rootReducer;
