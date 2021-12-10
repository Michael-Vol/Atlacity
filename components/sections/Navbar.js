import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';

const MenuItems = (props) => {
	const { children, isLast, to = '/', ...rest } = props;
	return (
		<Text
			mb={{ base: isLast ? 0 : 8, sm: 0 }}
			mr={{ base: 0, sm: isLast ? 0 : 8 }}
			display='block'
			color='gray.700'
			fontSize={18}
			_hover={{
				color: 'teal.300',
			}}
			{...rest}>
			<Link href={to}>{children}</Link>
		</Text>
	);
};

const Navbar = () => {
	return (
		<Flex as='nav' align='center' justify='space-between' w='100%' px='15px' py='5px' bgColor='gray.100'>
			<Flex justify='center'>
				<Box display={{ base: 'block', md: 'none' }}>
					<HamburgerIcon boxSize={6} />
				</Box>

				<Flex mr='15px'>
					<Image src='/images/atlacity-logo.png' width={72} height={62} layout='fixed' />
				</Flex>

				<Flex align='center' justify='center'>
					<MenuItems href='/explore'>Explore</MenuItems>
					<MenuItems href='/about'>About</MenuItems>
					<MenuItems href='/contact'>Contact</MenuItems>
				</Flex>
			</Flex>

			<Flex align='center' justify='center'>
				<MenuItems href='/login'>
					<Button color='primary'>Login</Button>
				</MenuItems>
				<MenuItems href='/register' isLast>
					<Button color='primary'>Register</Button>
				</MenuItems>
			</Flex>
		</Flex>
	);
};

export default Navbar;
