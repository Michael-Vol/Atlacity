import React, { useEffect, useState } from 'react';
import { Flex, Text, Skeleton, Divider, Stack, Heading } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { FiSettings } from 'react-icons/fi';
import { getSuggestedUsers } from '../../../actions/users/users';
import UserSuggestion from './UserSuggestion';

const UserSuggestionsSidebar = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { suggested } = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(getSuggestedUsers());
	}, []);

	return (
		<Flex
			flexDir={'column'}
			bgColor={'blue.50'}
			h={'93vh'}
			p={'20px'}
			fontWeight={'500'}
			color={'blue.800'}
			fontSize={'18px'}
			justifyContent={'space-between'}
			overflow={'scroll'}>
			<Flex flexDir={'column'}>
				<Text fontSize={'22px'}>People you may know</Text>
				{!suggested.isLoading ? (
					suggested.users.length > 0 &&
					suggested.users.map((user) => <UserSuggestion key={user._id} user={user.user} />)
				) : (
					<Stack mt={'20px'}>
						<Skeleton startColor='gray.500' height='15px' />
						<Skeleton startColor='gray.500' height='15px' w={'75%'} />
						<Skeleton startColor='gray.500' height='15px' w={'50%'} />
						<Skeleton startColor='gray.500' height='15px' w={'20%'} />
					</Stack>
				)}
			</Flex>
			<Flex flexDir={'column'}>
				<Divider />
				<Flex
					mt={'10px'}
					alignItems={'center'}
					justifyContent={'end'}
					cursor={'pointer'}
					onClick={() => router.push('/user/settings')}>
					<FiSettings size={'1.2em'} />
					<Text ml={'10px'} fontSize={'20px'}>
						Settings
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default UserSuggestionsSidebar;
