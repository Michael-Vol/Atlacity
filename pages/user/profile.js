import React from 'react';
import ProfileLayout from '../../components/layouts/user/ProfileLayout';
import Navbar from '../../components/sections/Landing/Navbar';
const Profile = () => {
	return (
		<div>
			<Navbar bg={'gray.300'} />
			<ProfileLayout />
		</div>
	);
};

export default Profile;
