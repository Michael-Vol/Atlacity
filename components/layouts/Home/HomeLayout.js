import React, { useEffect, useState, useRef } from 'react';
import {
	Flex,
	Text,
	Avatar,
	Input,
	Heading,
	Grid,
	GridItem,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import UserHomeActions from '../../sections/Home/UserHomeActions';
import HomeSidebar from '../../sections/Home/HomeSidebar';
import UserSuggestionsSidebar from '../../sections/Home/UserSuggestionsSidebar';
import ActivityFeed from '../../sections/Home/ActivityFeed';

const HomeLayout = () => {
	const auth = useSelector((state) => state.auth);
	const { profile } = useSelector((state) => state.profile);

	return (
		<Grid templateColumns={'repeat(20,1fr)'} h={'100%'}>
			<GridItem colSpan={3}>
				<HomeSidebar />
			</GridItem>
			<GridItem
				colSpan={13}
				maxH={'93vh'}
				overflow={'scroll'}
				css={{
					'&::-webkit-scrollbar': {
						width: '0px',
					},
				}}>
				<Flex color={'blue.700'} p={'30px'} mx={'20px'} flexDir={'column'}>
					<Heading fontSize={'28px'} fontWeight={'500'}>
						Welcome back, {auth.user.firstName}
					</Heading>
					<UserHomeActions />
					<Flex flexDir={'column'} mt={'20px'}>
						<ActivityFeed />
					</Flex>
				</Flex>
			</GridItem>
			<GridItem colSpan={4}>
				<UserSuggestionsSidebar />
			</GridItem>
		</Grid>
	);
};

export default HomeLayout;
