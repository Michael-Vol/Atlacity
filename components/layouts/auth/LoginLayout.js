import React, { useEffect } from 'react';
import { Grid, GridItem, Heading, Text, Box, useToast, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../../sections/Auth/Login/LoginForm';
import { useRouter } from 'next/router';
import login from '../../../actions/auth/login';

const LoginLayout = (props) => {
	const router = useRouter();
	const toast = useToast();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const handleSubmit = async (values, setSubmitting) => {
		dispatch(login(values));
		setSubmitting(false);
	};

	useEffect(() => {
		console.log(auth);
		if (auth.isAuthenticated) {
			if (!toast.isActive('error-toast') && !toast.isActive('success-toast')) {
				toast({
					title: 'Logged In!',
					id: 'success-toast',
					description: 'You have been logged in successfully.',
					status: 'success',
					duration: 4000,
				});
			}
			return router.push('/home');
		} else if (auth.error) {
			if (!toast.isActive('error-toast') && !toast.isActive('success-toast')) {
				return toast({
					title: 'Error',
					id: 'error-toast',
					description: auth.message || auth.error.response.data.message,
					status: 'error',
					duration: 4000,
				});
			}
		}
	}, [auth]);

	return (
		<Grid h='200px' templateRows='repeat(1, 1fr)' templateColumns='repeat(10, 1fr)' gap={1} h={'90vh'}>
			<GridItem colSpan={6} rowSpan={1}>
				<Image src='/images/auth.jpg' alt='register image' minW={'100%'} minH={'100%'} />
			</GridItem>
			<GridItem colSpan={4} my={'20px'} ml={'40px'} color={'blue.300'}>
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
