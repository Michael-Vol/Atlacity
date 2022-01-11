import React, { useEffect, useState } from 'react';
import { Flex, Text, Avatar, Divider } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { FaUserFriends } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { useRouter } from 'next/router';

const HomeSidebar = () => {
	const router = useRouter();

	const auth = useSelector((state) => state.auth);
	const { avatar } = useSelector((state) => state.profile);

	const [avatarFile, setAvatarFile] = useState(null);

	useEffect(() => {
		if (!avatar.isLoading && !avatarFile) {
			if (avatar.avatar) {
				setAvatarFile(Buffer.from(avatar.avatar.buffer.data).toString('base64'));
			}
		}
	}, [avatar]);

	return (
		<Flex
			flexDir={'column'}
			bgColor={'blue.50'}
			h={'92vh'}
			p={'20px'}
			fontWeight={'500'}
			color={'blue.800'}
			fontSize={'18px'}
			justifyContent={'space-between'}>
			<Flex flexDir={'column'}>
				<Flex
					alignItems={'center'}
					mt={'30px'}
					cursor={'pointer'}
					onClick={() => router.push('/user/profile')}>
					<Avatar
						cursor={'pointer'}
						boxSize={'2em'}
						src={avatarFile && `data:image/png;base64,${avatarFile}`}
						name={`${auth.user.firstName} ${auth.user.lastName}`}
					/>
					<Text ml={'15px'}>
						{`${auth.user.firstName}`} {`${auth.user.lastName}`}
					</Text>
				</Flex>
				<Flex
					alignItems={'center'}
					mt={'30px'}
					cursor={'pointer'}
					onClick={() => router.push('/connect')}>
					<FaUserFriends size={'2em'} />
					<Text ml={'15px'}>Connect</Text>
				</Flex>
				<Flex
					alignItems={'center'}
					mt={'30px'}
					cursor={'pointer'}
					onClick={() => router.push('/my-places')}>
					<MdLocationPin size={'2em'} />
					<Text ml={'15px'}>My Places</Text>
				</Flex>
			</Flex>
			<Flex flexDir={'column'}>
				<Divider />
				<Text mt={'5px'} fontSize={'18px'} fontWeight={'500'}>
					Pinned Places
				</Text>
				<Text mt={'10px'} fontSize={'16px'} color={'gray'}>
					No pinned places
				</Text>
			</Flex>
		</Flex>
	);
};

export default HomeSidebar;
