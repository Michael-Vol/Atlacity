import React, { useEffect, useState } from 'react';
import { Grid, GridItem, Heading, Text, Box, Image, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import CompleteProfileForm from '../../sections/Auth/Register/CompleteProfileForm';
import { uploadProfile, uploadAvatar } from '../../../actions/profile/profile';
import checkAuth from '../../../lib/checkAuthClient';

const CompleteProfileLayout = ({ onRegisterSuccess, onSkip }) => {
	const auth = useSelector((state) => state.auth);
	const profile = useSelector((state) => state.profile);
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [hasSubmittedAvatar, setHasSubmittedAvatar] = useState(false);
	const [avatar, setAvatar] = useState();
	const dispatch = useDispatch();
	const toast = useToast();

	const handleSubmit = (values) => {
		setHasSubmitted(true);
		if (values.photo) {
			setAvatar(values.photo);
		}

		const profileValues = Object.keys(values)
			.filter((key) => key !== 'photo')
			.reduce((obj, key) => {
				obj[key] = values[key];
				return obj;
			}, {});

		dispatch(uploadProfile(profileValues, auth.user._id));
	};

	const handleUploadAvatar = () => {
		setHasSubmittedAvatar(true);
		dispatch(uploadAvatar(avatar, auth.user._id));
	};

	useEffect(() => {
		if (!profile.isLoading && hasSubmitted) {
			if (profile.error) {
				// upload profile/avatar error
				if (!toast.isActive('success-toast') && !toast.isActive('error-toast')) {
					return toast({
						id: 'error-toast',
						title: 'Error',
						description: profile.message || profile.error.response.data.message,
						status: 'error',
						duration: 4000,
						isClosable: true,
					});
				}
				setHasSubmitted(false);
				setHasSubmittedAvatar(false);
			} else if (profile.avatarUploaded) {
				//2nd stage - uploaded avatar
				toast({
					id: 'success-avatar-toast',
					title: 'Success',
					description: profile.message,
					status: 'success',
					duration: 4000,
					isClosable: true,
				});
				onRegisterSuccess();
			} else if (profile.profile) {
				//1st-stage - uploaded profile
				if (!toast.isActive('success-toast') && !toast.isActive('error-toast')) {
					toast({
						id: 'success-toast',
						title: 'Success!',
						description: profile.message,
						status: 'success',
						duration: 4000,
						isClosable: true,
					});
					if (avatar) {
						return handleUploadAvatar();
					}
					onRegisterSuccess();
				}
			}
		}
	}, [profile]);

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
					<CompleteProfileForm onSubmit={handleSubmit} onSkip={onSkip} />
				</Box>
			</GridItem>
		</Grid>
	);
};

export default checkAuth(CompleteProfileLayout);
