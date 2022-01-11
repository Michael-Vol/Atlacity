import React, { useEffect, useState, useRef } from 'react';
import { Flex, Avatar, Text } from '@chakra-ui/react';
import axios from 'axios';
import Button from '../../ui/Button';

const UserSuggestion = ({ user }) => {
	const [avatarFile, setAvatarFile] = useState(null);
	const isLoading = false;
	const mountedRef = useRef(true);
	useEffect(() => {
		const getAvatar = async () => {
			let res = await axios.get(`/api/users/${user._id}/avatar`);
			if (!mountedRef.current) return null;
			setAvatarFile(Buffer.from(res.data.buffer.data).toString('base64'));
		};
		getAvatar();

		return () => {
			mountedRef.current = false;
		};
	}, []);

	return (
		<Flex
			my={'10px'}
			alignItems={'center'}
			bgColor={'#fff'}
			rounded={'xl'}
			px={'10px'}
			py={'20px'}
			justifyContent={'space-between'}>
			<Flex alignItems={'center'}>
				<Avatar
					boxSize={'2em'}
					name={`${user.firstName} ${user.lastName}`}
					src={avatarFile && `data:image/png;base64,${avatarFile}`}
				/>
				<Text ml={'15px'}>
					{user.firstName} {user.lastName}
				</Text>
			</Flex>
			<Button size={'md'} bgColor={'primary'}>
				Follow
			</Button>
		</Flex>
	);
};

export default UserSuggestion;
