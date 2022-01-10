import Link from 'next/link';
import { useEffect, useState } from 'react';
import LandingLayout from '../components/layouts/LandingLayout';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as cookie from 'cookie';
import HomeLayout from '../components/layouts/Home/HomeLayout';
import Navbar from '../components/sections/Landing/Navbar';
export default () => {
	const auth = useSelector((state) => state.auth);
	const router = useRouter();

	return !auth.isLoading ? (
		auth.isAuthenticated ? (
			<div>
				<Navbar />
				<HomeLayout />
			</div>
		) : (
			<div>
				<Navbar />
				<LandingLayout />
			</div>
		)
	) : (
		<div>Loading...</div>
	);
};
