import React, { useEffect, useState, useCallback } from 'react';
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

const ProfileLayout = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const { profile } = useSelector((state) => state.profile);
	const [activeSection, setActiveSection] = useState('timeline');

	useEffect(() => {
		if (!profile.isLoading && router.query.userId) {
			dispatch(getProfile(router.query.userId));
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
							<Flex m={'10px'}>
								<BackgroundPicker />
							</Flex>
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
										<Button bgColor={'blue.800'} size={'lg'}>
											<Text fontSize={'14px'}>Follow</Text>
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
