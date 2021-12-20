import React from 'react';
import { Grid, GridItem, Heading, Text, Box, Image, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import CompleteProfileForm from '../../sections/Auth/Register/CompleteProfileForm';
const CompleteProfileLayout = () => {
	const handleSubmit = (values) => {
		console.log('values : ', values);
	};

	return (
		<Grid templateColumns='repeat(10, 1fr)' gap={1} height={'90vh'}>
			<GridItem colSpan={6}>
				<Image src='/images/auth.jpg' alt='register image' minW={'100%'} minH={'100%'} />
			</GridItem>
			<GridItem
				colSpan={4}
				mt={'40px'}
				color={'blue.300'}
				ml={'20px'}
				overflowY={'scroll'}
				maxH={'80vh'}>
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
