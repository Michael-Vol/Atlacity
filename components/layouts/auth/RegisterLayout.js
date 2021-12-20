import React, { useEffect, useState } from 'react';
import { Grid, GridItem, Heading, Text, Box, Image, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import RegisterForm from '../../sections/Auth/Register/RegisterForm';
import register from '../../../actions/auth/register';

const RegisterLayout = ({ onRegisterSuccess }) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const [credentials, setCredentials] = useState({});
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const toast = useToast();
	const handleSubmit = (values) => {
		setHasSubmitted(true);
		dispatch(register(values));
		setCredentials({ email: values.email, password: values.password });
	};

	useEffect(() => {
		if (!auth.isLoading && hasSubmitted) {
			if (auth.isAuthenticated) {
				if (!toast.isActive('success-toast') && !toast.isActive('error-toast'))
					toast({
						id: 'success-toast',
						title: 'Success',
						description: auth.message,
						status: 'success',
						duration: 4000,
						isClosable: true,
					});
				onRegisterSuccess();
			} else if (auth.error) {
				if (!toast.isActive('error-toast') && !toast.isActive('success-toast'))
					return toast({
						id: 'error-toast',
						title: 'Error',
						description: auth.message || auth.error.response.data.message,
						status: 'error',
						duration: 4000,
						isClosable: true,
					});
			}
			setHasSubmitted(false);
		}
	}, [auth]);
	return (
		<Grid height={'90vh'} templateRows='repeat(1, 1fr)' templateColumns='repeat(10, 1fr)' gap={1}>
			<GridItem colSpan={6} rowSpan={'1'}>
				<Image src='/images/auth.jpg' alt='register image' minW={'100%'} minH={'100%'} />
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
