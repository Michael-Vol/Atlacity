import React, { useEffect, useState } from 'react';
import { Flex, Text, Heading, Grid, GridItem, Image, useToast } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import checkAuth from '../../../lib/checkAuthClient';
import ConnectItem from './ConnectItem';
import { getConnectUsers } from '../../../actions/users/users';
import SearchUsers from './SearchUsers';

const ConnectUsers = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	const { connect } = useSelector((state) => state.users);
	const [usersFetched, setUsersFetched] = useState(false);

	useEffect(() => {
		dispatch(getConnectUsers());
	}, []);

	useEffect(() => {
		if (!connect.isLoading) {
			if (connect.lowPopularityVisitors.length > 0 && connect.sameLocationUsers.length > 0) {
				setUsersFetched(true);
			} else if (connect.error) {
				return toast({
					title: connect.error || 'Something went wrong',
					status: 'error',
					duration: 4000,
					isClosable: true,
				});
			}
		}
	}, [connect]);

	return (
		<div>
			<Flex>
				<Heading fontSize={'38px'}>Connect</Heading>
			</Flex>
			<Flex flexDir={'column'} mt={'30px'}>
				<Flex mb={'20px'}>
					<SearchUsers />
				</Flex>
				<Flex flexDir={'column'}>
					<Heading fontSize={'20px'} color={'gray.600'}>
						People in your City
					</Heading>
					<Flex
						overflow={'scroll'}
						css={{
							'&::-webkit-scrollbar': {
								width: '0px',
							},
						}}>
						{usersFetched && connect.sameLocationUsers.length > 0 ? (
							<Grid templateColumns={'repeat(8,1fr)'} gap={4} mt={'30px'}>
								{connect.sameLocationUsers.map((user) => (
									<ConnectItem key={user.id} user={user} />
								))}
							</Grid>
						) : (
							<Flex mt={'20px'} p={'20px'}>
								<Text fontWeight={'500'} color={'gray.500'} fontSize={'20px'}>
									No Suggestions yet
								</Text>
							</Flex>
						)}
					</Flex>
				</Flex>
				<Flex mt={'30px'} flexDir={'column'}>
					<Heading fontSize={'20px'} color={'gray.600'}>
						People that discover new places
					</Heading>
					<Flex
						overflow={'scroll'}
						css={{
							'&::-webkit-scrollbar': {
								width: '0px',
							},
						}}>
						{usersFetched && connect.lowPopularityVisitors.length > 0 ? (
							<Grid templateColumns={'repeat(8,1fr)'} gap={4} mt={'30px'}>
								{connect.lowPopularityVisitors.map((user) => (
									<ConnectItem key={user.id} user={user} />
								))}
							</Grid>
						) : (
							<Flex mt={'20px'} p={'20px'}>
								<Text fontWeight={'500'} color={'gray.500'} fontSize={'20px'}>
									No Suggestions yet
								</Text>
							</Flex>
						)}
					</Flex>
				</Flex>
			</Flex>
		</div>
	);
};

export default ConnectUsers;
