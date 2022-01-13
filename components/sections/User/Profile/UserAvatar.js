import React, { useRef, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { BiPencil } from 'react-icons/bi';
import { Avatar, SkeletonCircle, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../../../actions/profile/profile';
import FileUploader from '../../../ui/FileUploader';
import { uploadAvatar } from '../../../../actions/profile/profile';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Dropzone() {
	const dispatch = useDispatch();
	const router = useRouter();
	const auth = useSelector((state) => state.auth);
	const { profile, avatar } = useSelector((state) => state.profile);

	const onDrop = (acceptedFiles) => {
		if (router.query && router.query.userId === auth.user._id) {
			dispatch(uploadAvatar(acceptedFiles[0], router.query.userId));
		}
	};

	const [avatarFile, setAvatarFile] = useState();
	const mountedRef = useRef(true);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxFiles: 1,
		multiple: false,
	});

	useEffect(() => {
		if (!avatar.isLoading && avatar.avatar) {
			//set avatar
			setAvatarFile(Buffer.from(avatar.avatar.buffer.data).toString('base64'));
		}
	}, [avatar]);
	useEffect(() => {
		const getAvatar = async () => {
			let res = await axios.get(`/api/users/${router.query.userId}/avatar`);
			if (!mountedRef.current) return null;
			const { exists, avatar } = res.data;
			if (exists) {
				setAvatarFile(Buffer.from(avatar.buffer.data).toString('base64'));
			}
		};
		if (router.query.userId) {
			getAvatar();
		}

		return () => {
			mountedRef.current = false;
		};
	}, [router.query]);

	const activeBg = useColorModeValue('gray.100', 'gray.600');

	return (
		<Flex alignItems={'end'} {...getRootProps()}>
			{!avatar.isLoading ? (
				<Avatar
					size={'2xl'}
					mt={'-50px'}
					name={`${profile.profile.user.firstName} ${profile.profile.user.lastName}`}
					src={avatarFile && `data:image/png;base64,${avatarFile}`}
				/>
			) : (
				<SkeletonCircle size={'130px'} mt={'-50px'} />
			)}

			{auth.user._id === router.query.userId && (
				<Flex cursor={'pointer'} ml={'-20px'} position={'relative'}>
					<BiPencil size={'25px'} />
					<input {...getInputProps()} />
				</Flex>
			)}
		</Flex>
	);
}
