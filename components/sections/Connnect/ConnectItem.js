import React, { useEffect, useRef, useState } from 'react';
import { Flex, Text, Image, GridItem } from '@chakra-ui/react';
import Button from '../../ui/Button';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { followUser, unfollowUser } from '../../../actions/users/users';
const ConnectItem = ({ user }) => {
	const [avatarFile, setAvatarFile] = useState(null);
	const mountedRef = useRef(true);
	const [followRequest, setFollowRequest] = useState(false);
	const [isFollowed, setIsFollowed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

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

	const handleFollowUser = async () => {
		try {
			setFollowRequest(true);
			setIsLoading(true);
			const res = await axios.post(`/api/users/${user._id}/follow`);
			console.log(res.data);
			setIsFollowed(true);
		} catch (error) {
			console.log(error);
			toast({
				title: error.response.data.message || "Can't follow user",
				duration: 3000,
				status: 'error',
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
		}
	};
	const handleUnfollowUser = async () => {
		try {
			setIsLoading(true);
			const res = await axios.post(`/api/users/${user._id}/unfollow`);
			console.log(res.data);
			setIsFollowed(false);
			setFollowRequest(false);
		} catch (error) {
			console.log(error);
			toast({
				title: error.response.data.message || "Can't unfollow user",
				duration: 3000,
				status: 'error',
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<GridItem>
			<Flex flexDir={'column'} bgColor={'#fff'} rounded={'xl'} w={'200px'}>
				<Image
					src={avatarFile && `data:image/png;base64,${avatarFile}`}
					height={'100%'}
					width={'100%'}
				/>
				<Flex flexDir={'column'} mt={'5px'} p={'10px'}>
					<Text fontSize={'20px'} fontWeight={'500'}>
						{user.firstName} {user.lastName}
					</Text>
					<Button
						m={'5px'}
						bgColor={'blue.600'}
						isLoading={isLoading}
						_hover={
							followRequest ? isFollowed && { bgColor: 'red.600' } : { bgColor: 'blue.800' }
						}
						bgColor={followRequest ? isFollowed && 'red.400' : 'primary'}
						onClick={isFollowed ? handleUnfollowUser : handleFollowUser}>
						{followRequest ? isFollowed && 'Unfollow' : 'Follow'}
					</Button>
					{!isFollowed && (
						<Button
							m={'5px'}
							bgColor={'white'}
							_hover={{ bgColor: 'gray.100' }}
							color={'blue.800'}>
							Remove
						</Button>
					)}
				</Flex>
			</Flex>
		</GridItem>
	);
};

export default ConnectItem;
