import Link from 'next/link';
import { useEffect } from 'react';
import LandingLayout from '../components/layouts/LandingLayout';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as cookie from 'cookie';
import HomeLayout from '../components/layouts/Home/HomeLayout';

export default () => {
	const auth = useSelector((state) => state.auth);
	const router = useRouter();

	useEffect(() => {
		if (!auth.isLoading) {
			if (auth.isAuthenticated) {
				return <HomeLayout />;
			} else {
				return <LandingLayout />;
			}
		}
	}, [auth]);

	return <div>{!auth.isLoading && (!auth.isAuthenticated ? <LandingLayout /> : null)}</div>;
};
