import React, { useEffect, useState } from 'react';
import { Flex, Text, Heading, useToast, Tag, Grid, GridItem, Avatar } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import checkAuth from '../../../lib/checkAuthClient';
import Sidebar from '../../ui/Sidebar';
import SidebarItem from '../../ui/SidebarItem';
import { FcTimeline, FcAbout } from 'react-icons/fc';
import { MdPlace } from 'react-icons/md';
import { BiBook } from 'react-icons/bi';

import AboutSection from '../../sections/User/Profile/AboutSection';
import Button from '../../ui/Button';

const ProfileLayout = () => {
	const auth = useSelector((state) => state.auth);
	const profile = useSelector((state) => state.profile);
	const [avatar, setAvatar] = useState();
	const [activeSection, setActiveSection] = useState('timeline');
	useEffect(() => {
		if (!profile.isLoading && profile.avatar) {
			//set avatar
			setAvatar(Buffer.from(profile.avatar.buffer.data).toString('base64'));
		}
	}, []);

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
			case 'about':
				return <AboutSection />;
			default:
				return null;
		}
	};

	return (
		<Flex flexDir={'column'}>
			<Flex h={'40vh'} bg={'gray.300'}></Flex>
			<Flex>
				<Flex flexDir={'column'} bg={'gray.50'} px={'20px'} w={'20%'} alignItems={'center'}>
					<Avatar
						size={'2xl'}
						mt={'-50px'}
						mx={'20px'}
						name={`${auth.user.firstName} ${auth.user.lastName}`}
						src={avatar && `data:image/png;base64,${avatar}`}
					/>
					<Flex mt={'30px'}>
						<Flex flexDir={'column'} fontSize={'20px'}>
							<Text>Followers</Text>
							<Text fontWeight={'600'} textAlign={'center'}>
								10
							</Text>
						</Flex>
						<Flex ml={'20px'} flexDir={'column'} fontSize={'20px'}>
							<Text>Following</Text>
							<Text fontWeight={'600'} textAlign={'center'}>
								10
							</Text>
						</Flex>
					</Flex>
					<Sidebar bgColor={'gray.50'} mt={'20px'}>
						<SidebarItem {...sidebarItemProps} onClick={() => setActiveSection('timeline')}>
							<FcTimeline />
							<Text ml={'10px'}>Timeline</Text>
						</SidebarItem>
						<SidebarItem {...sidebarItemProps} onClick={() => setActiveSection('about')}>
							<FcAbout />
							<Text ml={'10px'}>About</Text>
						</SidebarItem>
						<SidebarItem {...sidebarItemProps} onClick={() => setActiveSection('visits')}>
							<MdPlace />
							<Text ml={'10px'}>Visits</Text>
						</SidebarItem>
						<SidebarItem {...sidebarItemProps} onClick={() => setActiveSection('blog')}>
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
									{auth.user.firstName} {auth.user.lastName}
								</Text>
							</Heading>
							<Text fontSize={'19px'} color={'blue.500'} mt={'5px'}>
								Joined Atlacity on {new Date(auth.user.createdAt).toLocaleDateString()}
							</Text>
						</Flex>
						<Button bgColor={'blue.800'} size={'lg'}>
							<Text fontSize={'14px'}>Connect</Text>
						</Button>
					</Flex>
					{renderActiveSection()}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default checkAuth(ProfileLayout);
