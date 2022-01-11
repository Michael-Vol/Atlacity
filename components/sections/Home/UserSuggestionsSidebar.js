import React, { useEffect, useState } from 'react';
import { Flex, Text, Avatar, Divider } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FiSettings } from 'react-icons/fi';

const UserSuggestionsSidebar = () => {
	const router = useRouter();

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
				<Text fontSize={'22px'}>People you may know</Text>
				<Flex
					my={'10px'}
					alignItems={'center'}
					bgColor={'#fff'}
					rounded={'xl'}
					px={'10px'}
					py={'20px'}>
					<Avatar boxSize={'2em'} name={'John Doe'} />
					<Text ml={'15px'}>John Doe</Text>
				</Flex>
				<Flex
					my={'10px'}
					alignItems={'center'}
					bgColor={'#fff'}
					rounded={'xl'}
					px={'10px'}
					py={'20px'}>
					<Avatar boxSize={'2em'} name={'Jerry Vitus'} />
					<Text ml={'15px'}>Jerry Vitus</Text>
				</Flex>
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
