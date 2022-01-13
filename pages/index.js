import LandingLayout from '../components/layouts/LandingLayout';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Flex, Text } from '@chakra-ui/react';
import HomeLayout from '../components/layouts/Home/HomeLayout';
import Navbar from '../components/sections/Landing/Navbar';
import BarLoader from 'react-spinners/BarLoader';

export default () => {
	const auth = useSelector((state) => state.auth);
	const router = useRouter();

	return !auth.isLoading ? (
		auth.isAuthenticated ? (
			<div>
				<Navbar bgColor={'#fff'} />
				<HomeLayout />
			</div>
		) : (
			<div>
				<Navbar />
				<LandingLayout />
			</div>
		)
	) : (
		<Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} h={'93vh'}>
			<BarLoader color={'#213963'} width={'200px'} />
			<Text fontSize={'28px'}>Loading...</Text>
		</Flex>
	);
};
