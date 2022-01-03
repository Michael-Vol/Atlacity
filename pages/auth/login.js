import React from 'react';
import LoginLayout from '../../components/layouts/auth/LoginLayout';
import Navbar from '../../components/sections/Landing/Navbar';
const login = (props) => {
	return (
		<div>
			<Navbar />
			<LoginLayout {...props}></LoginLayout>;
		</div>
	);
};

export default login;
