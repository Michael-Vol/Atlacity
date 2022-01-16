import React, { useState, useEffect, useRef } from 'react';
import { Flex, Text, Avatar } from '@chakra-ui/react';
import axios from 'axios';

const SearchResult = ({ user, onUserSelect }) => {
	const [avatarFile, setAvatarFile] = useState(null);
	const mountedRef = useRef(true);
	useEffect(() => {
		const getAvatar = async () => {
			let res = await axios.get(`/api/users/${user._id}/avatar`);
			if (!mountedRef.current) return null;
			const { exists, avatar } = res.data;
			if (exists) {
				setAvatarFile(Buffer.from(avatar.buffer.data).toString('base64'));
			}
		};
		getAvatar();

		return () => {
			mountedRef.current = false;
		};
	}, []);
	return (
		<Flex
			cursor={'pointer'}
			onClick={() => onUserSelect(user)}
			w={'100%'}
			p={'10px'}
			_hover={{
				bgColor: 'gray.200',
			}}>
			<Avatar
				size={'sm'}
				name={`${user.firstName} ${user.lastName}`}
				src={avatarFile && `data:image/png;base64,${avatarFile}`}
			/>
			<Text ml={'10px'} fontWeight={'500'} fontSize={'18px'}>
				{user.firstName} {user.lastName}
			</Text>
		</Flex>
	);
};

export default SearchResult;
