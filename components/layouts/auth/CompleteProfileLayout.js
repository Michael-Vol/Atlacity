import React from 'react';
import { Grid, GridItem, Heading, Text, Box, Image, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import CompleteProfileForm from '../../sections/Auth/Register/CompleteProfileForm';
const CompleteProfileLayout = () => {
	const handleSubmit = (values) => {
		console.log(values);
	};

	return (
		<Grid minH={'100%'} templateRows='repeat(1, 1fr)' templateColumns='repeat(10, 1fr)' gap={1}>
			<GridItem colSpan={6} rowSpan={'1'}>
				<Image src='/images/auth.jpg' alt='register image' />
			</GridItem>
			<GridItem colSpan={4} mt={'40px'} color={'blue.300'} ml={'20px'}>
				<Heading mt={'5px'} color={'blue.300'}>
					Complete Your Profile
				</Heading>
				<Text mt={'20px'} fontWeight={'700'} fontSize={'18px'}>
					<Text as='span' color={'gray.600'}>
						Fill in your profile info to get started
					</Text>
				</Text>
				<Box mt={'50px'}>
					<CompleteProfileForm onSubmit={handleSubmit} />
				</Box>
			</GridItem>
		</Grid>
	);
};

export default CompleteProfileLayout;
