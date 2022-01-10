import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';

const withAuth = (Component) => (props) => {
	const auth = useSelector((state) => state.auth);
	const persist = useSelector((state) => state._persist);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		if (!auth.isLoading && persist.rehydrated) {
			if (auth.isAuthenticated === false) {
				Router.push('/');
			} else if (auth.isAuthenticated) {
				setIsAuthenticated(true);
			}
		}
	}, [auth, persist]);

	return <div>{isAuthenticated && <Component {...props} />}</div>;
};

export default withAuth;
