import React, { useEffect, useState, useRef } from 'react';
import { Flex, Avatar, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../../actions/users/users';

const UserSuggestion = ({ user }) => {
	const toast = useToast();
	const dispatch = useDispatch();
	const { follow, unfollow } = useSelector((state) => state.users);
	const [followRequest, setFollowRequest] = useState(false);
	const [isFollowed, setIsFollowed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [avatarFile, setAvatarFile] = useState(null);
	const mountedRef = useRef(true);

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
			<Button
				ml={'5px'}
				size={'md'}
				isLoading={isLoading}
				fontSize={'14px'}
				_hover={followRequest ? isFollowed && { bgColor: 'red.600' } : { bgColor: 'blue.800' }}
				bgColor={followRequest ? isFollowed && 'red.400' : 'primary'}
				onClick={isFollowed ? handleUnfollowUser : handleFollowUser}>
				{followRequest ? isFollowed && 'Unfollow' : 'Follow'}
			</Button>
		</Flex>
	);
};

export default UserSuggestion;
