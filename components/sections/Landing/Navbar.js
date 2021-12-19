import React, { Fragment } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../ui/Button';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import logout from '../../../actions/auth/logout';

const MenuItems = (props) => {
	const { children, isLast, to, ...rest } = props;
	return (
		<Text
			mb={{ base: isLast ? 0 : 8, sm: 0 }}
			mr={{ base: 0, sm: isLast ? 0 : 8 }}
			display='block'
			color='blue.500'
			fontSize={20}
			transition={'all .1s ease-in-out'}
			_hover={{
				color: 'blue.100',
			}}
			{...rest}>
			<Link href={to}>{children}</Link>
		</Text>
	);
};
const Navbar = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
	const auth = useSelector((state) => state.auth);

	const handleLogout = async () => {
		await dispatch(logout());
		router.push('/');
	};

	return (
		<Flex as='nav' align='center' justify='space-between' w='100%' px='15px' py='20px' h={'80px'}>
			<Flex justify='center'>
				<Box display={{ base: 'block', md: 'none' }}>
					<HamburgerIcon boxSize={6} />
				</Box>

				<Flex mr='15px'>
					<Box onClick={() => router.push('/')}>
						<Image src='/vectors/atlacity-logo.png' width={72} height={62} layout='fixed' />
					</Box>
				</Flex>

				<Flex align='center' justify='center'>
					<MenuItems to='/explore'> Explore</MenuItems>
					<MenuItems to='/cities'>Cities</MenuItems>
					<MenuItems to='/blogs'>Blogs</MenuItems>
					<MenuItems to='/about'>About</MenuItems>
				</Flex>
			</Flex>

			<Flex align='center' justify='center'>
				{!isAuthenticated ? (
					<Fragment>
						<Box mr={'20px'}>
							<Button onClick={() => router.push('/auth/login')}>Login</Button>
						</Box>
						<Box>
							<Button onClick={() => router.push('/auth/register')}>Register</Button>
						</Box>
					</Fragment>
				) : (
					<Box mr={'20px'}>
						<Button bg='red.400' _hover={{ bg: 'red.500' }} onClick={handleLogout}>
							Logout
						</Button>
					</Box>
				)}
			</Flex>
		</Flex>
	);
};

export default Navbar;
