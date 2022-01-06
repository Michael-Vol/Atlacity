import React, { useEffect, useState } from 'react';
import { Grid, GridItem, Heading, Text, Box, Image, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import CompleteProfileForm from '../../sections/Auth/Register/CompleteProfileForm';
import { uploadProfile, uploadAvatar } from '../../../actions/profile/profile';
import checkAuth from '../../../lib/checkAuthClient';

const CompleteProfileLayout = ({ onRegisterSuccess, onSkip }) => {
	const auth = useSelector((state) => state.auth);
	const { profile, avatar } = useSelector((state) => state.profile);

	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [file, setFile] = useState();
	const dispatch = useDispatch();
	const toast = useToast();

	const handleSubmit = (values) => {
		setHasSubmitted(true);
		if (values.photo) {
			setFile(values.photo);
		}

		const profileValues = Object.keys(values)
			.filter((key) => key !== 'photo')
			.reduce((obj, key) => {
				obj[key] = values[key];
				return obj;
			}, {});

		dispatch(uploadProfile(profileValues, auth.user._id));
	};

	useEffect(() => {
		if (!profile.isLoading && hasSubmitted) {
			if (profile.error) {
				if (!toast.isActive('success-toast') && !toast.isActive('error-toast')) {
					return toast({
						id: 'error-toast',
						title: profile.error.message || 'Something went wrong',
						status: 'error',
					});
				}
			} else if (profile.profile) {
				if (file) return dispatch(uploadAvatar(file, auth.user._id));

				if (!toast.isActive('success-toast') && !toast.isActive('error-toast')) {
					toast({
						id: 'success-toast',
						title: 'Profile updated successfully',
						status: 'success',
					});
				}
				onRegisterSuccess();
			}
		}
	}, [profile]);

	useEffect(() => {
		if (!avatar.isLoading) {
			console.log(avatar);
			if (avatar.error) {
				if (!toast.isActive('success-toast') && !toast.isActive('error-toast')) {
					return toast({
						id: 'error-toast',
						title: avatar.error.message || 'Something went wrong',
						status: 'error',
					});
				}
			} else if (avatar.avatarUploaded) {
				if (!toast.isActive('success-toast') && !toast.isActive('error-toast')) {
					toast({
						id: 'success-toast',
						title: 'Avatar updated successfully',
						status: 'success',
					});
				}
				onRegisterSuccess();
			}
		}
	}, [avatar]);

	return (
		<Grid templateColumns='repeat(10, 1fr)' gap={1} height={'92vh'}>
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
