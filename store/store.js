import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ThunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
const storage = require('redux-persist/lib/storage').default;

const initStore = (initialState, reducer) => {
	const middleware = [ThunkMiddleware];
	return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
};

const makeStore = (initialState = {}) => {
	if (typeof window === 'undefined') {
		//Server-side , create store
		return initStore(initialState, rootReducer);
	} else {
		//Client-side,create persisted store
		const persistConfig = {
			key: 'root',
			storage,
		};

		const persistedReducer = persistReducer(persistConfig, rootReducer);
		const store = initStore(initialState, persistedReducer);
		store.__persistor = persistStore(store);
		return store;
	}
};

export const wrapper = createWrapper(makeStore);
