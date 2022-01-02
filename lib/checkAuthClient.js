import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';

const withAuth = (Component) => (props) => {
	const auth = useSelector((state) => state.auth);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		if (!auth.isLoading) {
			if (auth.isAuthenticated === false) {
				Router.push('/');
			} else if (auth.isAuthenticated) {
				setIsAuthenticated(true);
			}
		}
	}, [auth]);

	return <div>{isAuthenticated && <Component {...props} />}</div>;
};

export default withAuth;
