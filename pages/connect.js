import React from 'react';
import Navbar from '../components/sections/Landing/Navbar';
import ConnectLayout from '../components/layouts/connect/ConnectLayout';
import checkAuth from '../lib/checkAuthClient';

const connect = () => {
	return (
		<div>
			<Navbar />
			<ConnectLayout />
		</div>
	);
};

export default checkAuth(connect);
