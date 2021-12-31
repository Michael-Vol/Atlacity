import React, { useEffect, useState } from 'react';
import useStore from '../store/store';
import Router from 'next/router';

const withAuth = (Component) => {
	const Auth = (props) => {
		const store = useStore();
		const [isAuthenticated, setIsAuthenticated] = useState(false);
		useEffect(() => {
			if (store.getState().auth.accessToken === null) {
				return Router.replace('/');
			} else {
				setIsAuthenticated(true);
			}
		}, []);

		if (isAuthenticated) {
			return <Component {...props} />;
		} else {
			return <div>Waiting for Authorization</div>;
		}
	};
	return Auth;
};

export default withAuth;
