import React from 'react';
import { Grid, GridItem, Heading, Text, Box, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../sections/Auth/Login/LoginForm';
const LoginLayout = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const handleSubmit = (values) => {
		console.log(values);
	};
	return (
		<Grid h='200px' templateRows='repeat(1, 1fr)' templateColumns='repeat(10, 1fr)' gap={1} h={'90vh'}>
			<GridItem colSpan={6}>
				<Box m={'auto'}>
					<Image size={'100%'} src='/images/auth.jpg' alt='register image' />
				</Box>
			</GridItem>
			<GridItem colSpan={4} my={'20px'} mx={'40px'} color={'blue.300'}>
				<Text fontSize={'18px'}>Sign in here if you have an Atlacity account.</Text>
				<Heading mt={'5px'} color={'blue.300'}>
					Sign in
				</Heading>
				<Text mt={'20px'} fontWeight={'700'}>
					<Text as='span' color={'gray.500'}>
						Not a member yet?{' '}
					</Text>
					<span>
						<Link href='/auth/register'>Sign Up</Link>
					</span>
				</Text>
				<Box mt={'50px'}>
					<LoginForm onSubmit={handleSubmit} />
				</Box>
			</GridItem>
		</Grid>
	);
};

export default LoginLayout;
