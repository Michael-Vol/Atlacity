import React, { useEffect, useState } from 'react';
import { Grid, GridItem, Heading, Text, Box, Image, Flex, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import checkAuth from '../../../lib/checkAuthClient';
import EmailVerificationForm from '../../sections/Auth/Register/EmailVerificationForm';
import { verifyEmail } from '../../../actions/auth/verifyEmail';

const VerifyEmailLayout = ({ onVerificationSuccess, onSkip }) => {
	const dispatch = useDispatch();
	const emailVerification = useSelector((state) => state.emailVerification);
	const [dispatched, setDispatched] = useState(false);
	const toast = useToast();
	const handleSubmit = async (formData) => {
		console.log(formData);
		dispatch(verifyEmail(formData));
		setDispatched(true);
	};

	useEffect(() => {
		if (!emailVerification.isLoading && dispatched) {
			setDispatched(false);
			if (emailVerification.verified) {
				if (!toast.isActive('success-toast') && !toast.isActive('error-toast')) {
					toast({
						id: 'success-toast',
						title: 'Success',
						description: emailVerification.message,
						status: 'success',
						duration: 4000,
						isClosable: true,
					});
					onVerificationSuccess();
				}
			} else {
				if (!toast.isActive('success-toast') && !toast.isActive('error-toast')) {
					toast({
						id: 'error-toast',
						title: 'Error',
						description: 'Check your verification code.',
						status: 'error',
						duration: 4000,
						isClosable: true,
					});
				}
			}
		}
	}, [emailVerification]);

	return (
		<Grid templateColumns='repeat(10, 1fr)' gap={1} height={'90vh'}>
			<GridItem colSpan={6}>
				<Image src='/images/auth.jpg' alt='register image' minW={'100%'} minH={'100%'} />
			</GridItem>
			<GridItem colSpan={4} mt={'40px'} color={'blue.300'} overflowY={'scroll'} maxH={'80vh'}>
				<Flex alignItems={'center'} flexDir={'column'}>
					<Heading mt={'5px'} color={'blue.300'}>
						One last step...
					</Heading>
					<Heading mt={'30px'} color={'blue.500'} fontSize={'18px'}>
						Check your email
					</Heading>
					<Text
						mt={'10px'}
						fontWeight={'500'}
						textAlign={'center'}
						px={'40px'}
						color={'blue.500'}
						fontSize={'18px'}>
						We have sent you an email with a code to verify your email address.
					</Text>
					<Image src='/vectors/verification_email.png' alt='verification_email' maxH={'34vh'} />

					<EmailVerificationForm onSubmit={handleSubmit} onSkip={onSkip} />
				</Flex>
			</GridItem>
		</Grid>
	);
};

export default checkAuth(VerifyEmailLayout);
