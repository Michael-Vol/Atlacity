import Link from 'next/link';
import { useEffect } from 'react';
import LandingLayout from '../components/layouts/LandingLayout';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as cookie from 'cookie';

export default (props) => {
	const auth = useSelector((state) => state.auth);
	const router = useRouter();
	// useEffect(() => {
	// 	if (auth.isAuthenticated) {
	// 		return router.push('/home');
	// 	}
	// }, [auth]);

	// if (!auth.isAuthenticated) {
	// 	return <LandingLayout />;
	// }

	// return <div>Loading...</div>;
	return <div>{!props.isAuthenticated && <LandingLayout />}</div>;
};

export const getServerSideProps = async (context) => {
	const cookies = context.req ? context.req.headers.cookie : null;
	let isAuthenticated = false;
	if (!cookies) {
		return {
			props: {
				isAuthenticated,
			},
		};
	}

	const parsedCookies = cookie.parse(cookies);

	if (parsedCookies.refreshToken) {
		return {
			redirect: {
				destination: '/home',
			},
		};
	}

	return {
		props: {
			isAuthenticated,
		},
	};
};
