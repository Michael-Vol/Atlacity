import React from 'react';
import { Flex, Grid, GridItem, Heading, Text, Box, Image } from '@chakra-ui/react';
import Link from 'next/link';
// import Image from 'next/image';

import RegisterForm from '../sections/Auth/Register/RegisterForm';

const RegisterLayout = () => {
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
				<Box mt={'80px'}>
					<RegisterForm />
				</Box>
			</GridItem>
		</Grid>
	);
};

export default RegisterLayout;
