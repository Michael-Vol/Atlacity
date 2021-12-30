import React, { useEffect, useState } from 'react';
import { Grid, GridItem, Heading, Text, Box, Image, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import checkAuth from '../../../lib/checkAuthClient';

const VerifyEmailLayout = ({ onRegisterSuccess }) => {
	const auth = useSelector((state) => state.auth);

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
				maxH={'80vh'}
				textAlign={'center'}>
				<Heading mt={'5px'} color={'blue.300'}>
					One last step...
				</Heading>
				<Heading mt={'30px'} color={'blue.500'} fontSize={'18px'}>
					Check your email
				</Heading>
				<Image src='/vectors/verification_email.png' alt='verification_email' />

				<Text mt={'10px'} fontWeight={'500'} px={'100px'} fontSize={'18px'} color={'blue.500'}>
					<Text as='span'>
						We sent you an email to verify your email address. Please click the link in the email
						to complete registration.
					</Text>
				</Text>
				<Box mt={'50px'}></Box>
			</GridItem>
		</Grid>
	);
};

export default checkAuth(VerifyEmailLayout);
