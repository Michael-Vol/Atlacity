import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../actions/auth/loadUser';

const Layout = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadUser());
	}, []);

	return <div>{props.children}</div>;
};

export default Layout;
