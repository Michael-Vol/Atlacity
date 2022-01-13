import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { BiPencil } from 'react-icons/bi';
import { Avatar, SkeletonCircle, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../../../actions/profile/profile';
import FileUploader from '../../../ui/FileUploader';
import { uploadAvatar } from '../../../../actions/profile/profile';

export default function Dropzone() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const onDrop = (acceptedFiles) => {
		console.log(acceptedFiles[0]);
		dispatch(uploadAvatar(acceptedFiles[0], auth.user._id));
	};

	const { profile, avatar } = useSelector((state) => state.profile);
	const [avatarFile, setAvatarFile] = useState();

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

	const activeBg = useColorModeValue('gray.100', 'gray.600');

	return (
		<Flex alignItems={'end'} {...getRootProps()}>
			{!avatar.isLoading ? (
				<Avatar
					size={'2xl'}
					mt={'-50px'}
					name={`${auth.user.firstName} ${auth.user.lastName}`}
					src={avatarFile && `data:image/png;base64,${avatarFile}`}
				/>
			) : (
				<SkeletonCircle size={'130px'} mt={'-50px'} />
			)}

			<Flex cursor={'pointer'} ml={'-20px'} position={'relative'}>
				<BiPencil size={'25px'} />
				<input {...getInputProps()} />
			</Flex>
		</Flex>
	);
}
