import React, { useEffect } from 'react';
import { Grid, GridItem, Heading, Text, Box, Image, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import RegisterForm from '../sections/Auth/Register/RegisterForm';
import register from '../../actions/auth/register';
const RegisterLayout = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const toast = useToast();
	const handleSubmit = (values) => {
		console.log(values);
		dispatch(register(values));
	};

	useEffect(() => {
		if (!auth.loading && auth.error) {
			console.log(auth.error.response.data.message);
			if (!toast.isActive('error-toast') && !toast.isActive('success-toast'))
				return toast({
					id: 'error-toast',
					title: 'Error',
					description: auth.error.response.data.message,
					status: 'error',
					duration: 4000,
					isClosable: true,
				});
		} else if (!auth.loading && auth.user) {
			if (!toast.isActive('success-toast') && !toast.isActive('error-toast'))
				return toast({
					id: 'success-toast',
					title: 'Success',
					description: auth.message,
					status: 'success',
					duration: 4000,
					isClosable: true,
				});
		}
		console.log(auth);
	}, [auth]);
	return (
		<Grid
			h='200px'
			templateRows='repeat(1, 1fr)'
			templateColumns='repeat(10, 1fr)'
			gap={1}
			h={'90vh'}
			alignItems={'center'}>
			<GridItem colSpan={6}>
				<Box m={'auto'}>
					<Image size={'100%'} src='/images/register.jpg' alt='register image' />
				</Box>
			</GridItem>
			<GridItem colSpan={4} mt={'40px'} color={'blue.300'} ml={'20px'}>
				<Text fontSize={'18px'}>Start for free</Text>
				<Heading mt={'5px'} color={'blue.300'}>
					Sign Up to Atlacity
				</Heading>
				<Text mt={'20px'} fontWeight={'700'}>
					<Text as='span' color={'gray.400'}>
						Already a member?{' '}
					</Text>
					<span>
						<Link href='/auth/login'>Log in</Link>
					</span>
				</Text>
				<Box mt={'50px'}>
					<RegisterForm onSubmit={handleSubmit} />
				</Box>
			</GridItem>
		</Grid>
	);
};

export default RegisterLayout;
