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

const HomeLayout = () => {
	const auth = useSelector((state) => state.auth);
	const { profile } = useSelector((state) => state.profile);

	return (
		<Grid templateColumns={'repeat(20,1fr)'} h={'100vh'}>
			<GridItem colSpan={3}></GridItem>
			<GridItem colSpan={14}>
				<Flex color={'blue.700'} py={'30px'} px={'30px'} mx={'60px'} flexDir={'column'}>
					<Heading fontSize={'28px'} fontWeight={'500'}>
						Welcome back, {auth.user.firstName}
					</Heading>
					<UserHomeActions />
				</Flex>
			</GridItem>
			<GridItem colSpan={3}></GridItem>
		</Grid>
	);
};

export default HomeLayout;
