import Link from 'next/link';
import { useEffect } from 'react';
import LandingLayout from '../components/layouts/LandingLayout';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export default () => {
	const auth = useSelector((state) => state.auth);
	const router = useRouter();

	useEffect(() => {
		if (auth.isAuthenticated) {
			return router.push('/home');
		}
	}, [auth]);

	return <LandingLayout />;
};
