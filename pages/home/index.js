import React from 'react';
import { useSession, getSession } from 'next-auth/react';
const Home = () => {
	const { data: session, status } = useSession();
	console.log(session, status);
	return <div></div>;
};

export default Home;
