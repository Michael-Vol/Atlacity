import React, { useEffect, useState, useRef } from 'react';
import { Flex, Text, Heading, useToast, Tag, Grid, GridItem, Box } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import checkAuth from '../../../lib/checkAuthClient';
import Sidebar from '../../ui/Sidebar';
import SidebarItem from '../../ui/SidebarItem';
import { FcTimeline, FcAbout } from 'react-icons/fc';
import { BiBook } from 'react-icons/bi';
import { BsFillDoorOpenFill } from 'react-icons/bs';
import BarLoader from 'react-spinners/BarLoader';
import { getProfile } from '../../../actions/profile/profile';

import AboutSection from '../../sections/User/Profile/AboutSection';
import TimelineSection from '../../sections/User/Profile/TimelineSection';
import BackgroundPicker from '../../sections/User/Profile/BackgroundPicker';
import Button from '../../ui/Button';
import UserAvatar from '../../sections/User/Profile/UserAvatar';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProfileLayout = () => {
	const toast = useToast();
	const router = useRouter();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const { profile } = useSelector((state) => state.profile);
	const [activeSection, setActiveSection] = useState('timeline');
	const mountedRef = useRef(true);

	const [followRequest, setFollowRequest] = useState(false);
	const [isFollowed, setIsFollowed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (router.query.userId) {
			dispatch(getProfile(router.query.userId));
		}
	}, [router]);

	useEffect(() => {
		if (router.query.userId) {
			const checkIfUserIsFollowed = async () => {
				try {
					setIsLoading(true);
					const res = await axios.get(`/api/users/${router.query.userId}/is-followed`);
					if (!mountedRef.current) return null;
					setIsFollowed(res.data.isFollowed);
				} catch (error) {
					toast({
						title: error.response.data.message || 'Something went wrong',
						status: 'error',
						duration: 4000,
						isClosable: true,
					});
				} finally {
					setIsLoading(false);
				}
			};
			checkIfUserIsFollowed();
			return () => {
				mountedRef.current = false;
			};
		}
	}, [router]);

	const sidebarItemProps = {
		fontSize: '22px',
		color: 'blue.500',
		fontWeight: '600',
		alignItems: 'center',
		_hover: {
			color: 'black',
		},
	};
	const renderActiveSection = () => {
		switch (activeSection) {
			case 'timeline':
				return <TimelineSection />;
			case 'about':
				return <AboutSection />;
			default:
				return null;
		}
	};
	const handleFollowUser = async () => {
		try {
			setFollowRequest(true);
			setIsLoading(true);
			const res = await axios.post(`/api/users/${router.query.userId}/follow`);
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
			const res = await axios.post(`/api/users/${router.query.userId}/unfollow`);
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
		<Flex flexDir={'column'}>
			{!profile.isLoading ? (
				profile.profile && (
					<div>
						<Flex
							h={'50vh'}
							bg={
								profile.profile.backgroundImage !== 'none' &&
								`url(https://images.unsplash.com/photo-${profile.profile.backgroundImage})`
							}
							bgColor={profile.profile.backgroundImage === 'none' && 'gray.50'}
							bgRepeat={'no-repeat'}
							bgSize={'cover'}
							justifyContent={'end'}
							alignItems={'end'}>
							{router.query.userId === auth.user._id && (
								<Flex m={'10px'}>
									<BackgroundPicker />
								</Flex>
							)}
						</Flex>
						<Flex>
							<Flex
								flexDir={'column'}
								bg={'blue.50'}
								px={'20px'}
								w={'20%'}
								alignItems={'center'}>
								<UserAvatar />
								<Flex mt={'30px'}>
									<Flex flexDir={'column'} fontSize={'20px'}>
										<Text>Followers</Text>
										<Text fontWeight={'600'} textAlign={'center'}>
											{profile.profile.followers.length}
										</Text>
									</Flex>
									<Flex ml={'20px'} flexDir={'column'} fontSize={'20px'}>
										<Text>Following</Text>
										<Text fontWeight={'600'} textAlign={'center'}>
											{profile.profile.following.length}
										</Text>
									</Flex>
								</Flex>
								<Sidebar bgColor={'blue.50'} mt={'20px'}>
									<SidebarItem
										{...sidebarItemProps}
										onClick={() => setActiveSection('timeline')}>
										<FcTimeline />
										<Text ml={'10px'}>Timeline</Text>
									</SidebarItem>
									<SidebarItem
										{...sidebarItemProps}
										onClick={() => setActiveSection('about')}>
										<FcAbout />
										<Text ml={'10px'}>About</Text>
									</SidebarItem>
									<SidebarItem
										{...sidebarItemProps}
										onClick={() => setActiveSection('visits')}>
										<BsFillDoorOpenFill />
										<Text ml={'10px'}>Visits</Text>
									</SidebarItem>
									<SidebarItem
										{...sidebarItemProps}
										onClick={() => setActiveSection('blog')}>
										<BiBook />
										<Text ml={'10px'}>Blog</Text>
									</SidebarItem>
								</Sidebar>
							</Flex>

							<Flex flexDir={'column'} m={'30px'} w={'100%'}>
								<Flex justifyContent={'space-between'}>
									<Flex flexDir={'column'}>
										<Heading>
											<Text fontSize={'36px'}>
												{profile.profile.user.firstName}{' '}
												{profile.profile.user.lastName}
											</Text>
										</Heading>
									</Flex>
									{profile.profile.user._id !== auth.user._id && (
										<Button
											isLoading={isLoading}
											_hover={
												isFollowed ? { bgColor: 'red.600' } : { bgColor: 'blue.800' }
											}
											bgColor={!isLoading && (isFollowed ? 'red.400' : 'primary')}
											onClick={
												!isLoading &&
												(isFollowed ? handleUnfollowUser : handleFollowUser)
											}>
											{!isLoading && (isFollowed ? 'Unfollow' : 'Follow')}
										</Button>
									)}
								</Flex>
								{renderActiveSection()}
							</Flex>
						</Flex>{' '}
					</div>
				)
			) : (
				<Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} h={'93vh'}>
					<BarLoader color={'#213963'} width={'200px'} />
					<Text fontSize={'28px'}>Loading...</Text>
				</Flex>
			)}
		</Flex>
	);
};

export default checkAuth(ProfileLayout);
