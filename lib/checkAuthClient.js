import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';

const withAuth = (Component) => (props) => {
	const auth = useSelector((state) => state.auth);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		if (!auth.isLoading) {
			if (auth.isAuthenticated === false) {
				return Router.push('/');
			} else if (auth.isAuthenticated) {
				setIsAuthenticated(true);
			}
		}
	}, [auth]);

	if (typeof window !== 'undefined') {
		if (isAuthenticated) {
			return <Component {...props} />;
		} else {
			return <div></div>;
		}
	}
	return null;
};

export default withAuth;
