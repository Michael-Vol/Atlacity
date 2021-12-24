import React, { useEffect } from 'react';
import { Grid, GridItem, Heading, Text, Box, Image, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import CompleteProfileForm from '../../sections/Auth/Register/CompleteProfileForm';
import { uploadProfile, uploadAvatar } from '../../../actions/auth/register';

const CompleteProfileLayout = ({ onRegisterSuccess }) => {
	const auth = useSelector((state) => state.auth);
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [hasSubmittedAvatar, setHasSubmittedAvatar] = useState(false);
	const dispatch = useDispatch();
	const toast = useToast();

	const handleSubmit = (values) => {
		console.log('values : ', values);
		setHasSubmitted(true);
		const fileImage = values.photo;
		if (fileImage) {
			setHasSubmittedAvatar(true);
			dispatch(uploadAvatar(fileImage));
		}
		dispatch(uploadProfile(values.filter((item) => item.name !== 'photo')));
	};

	useEffect(() => {
		if (!auth.isLoading && hasSubmitted) {
			if (auth.profile && (!auth.hasSubmittedAvatar || (hasSubmittedAvatar && auth.avatar))) {
				if (!toast.isActive('success-toast') && !toast.isActive('error-toast')) {
					toast({
						id: 'success-toast',
						title: 'Success!',
						description: auth.message,
						status: 'success',
						duration: 4000,
						isClosable: true,
					});
					onRegisterSuccess();
				}
			} else if (auth.error) {
				if (!toast.isActive('success-toast') && !toast.isActive('error-toast')) {
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
				setHasSubmittedAvatar(false);
			}
		}
	}, [auth]);

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
