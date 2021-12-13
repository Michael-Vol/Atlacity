import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ThunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

let store;

const initStore = (initialState) => {
	const middleware = [ThunkMiddleware];
	return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
};

export const initializeStore = (preloadedState) => {
	let _store = store ?? initStore(preloadedState);

	if (preloadedState && store) {
		_store = initStore({
			...store.getState(),
			...preloadedState,
		});
		//Reset the current store
		store = undefined;
	}

	//For SSR we need to ensure we don't store the store on the server
	if (typeof window === 'undefined') return _store;

	if (!store) store = _store;
	return _store;
};

export default function useStore(initialState) {
	const store = useMemo(() => initializeStore(initialState), [initialState]);
	return store;
}
