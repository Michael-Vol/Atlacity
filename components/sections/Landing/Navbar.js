import React, { Fragment, useEffect, useState } from 'react';
import { Flex, Box, Text, Image, Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import Button from '../../ui/Button';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import logout from '../../../actions/auth/logout';
import { getAvatar } from '../../../actions/profile/profile';
import { RiArrowDownSFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { useStore } from 'react-redux';

const MenuItems = (props) => {
	const { children, isLast, to, ...rest } = props;
	return (
		<Text
			mb={{ base: isLast ? 0 : 8, sm: 0 }}
			mr={{ base: 0, sm: isLast ? 0 : 8 }}
			display='block'
			color={props.itemColor || 'blue.800'}
			fontSize={18}
			fontWeight={'400'}
			transition={'all .1s ease-in-out'}
			_hover={{
				color: 'blue.400',
			}}
			{...rest}>
			<Link href={to}>{children}</Link>
		</Text>
	);
};
const Navbar = (props) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const store = useStore();

	const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
	const auth = useSelector((state) => state.auth);
	const profile = useSelector((state) => state.profile);

	const [avatar, setAvatar] = useState(null);
	const [showMenu, setShowMenu] = useState(false);

	const handleLogout = async () => {
		await dispatch(logout());
		router.push('/');
		store.__persistor.purge();
	};

	const goToProfile = () => {
		return router.push('/user/profile');
	};

	useEffect(() => {
		if (!profile.isLoading) {
			if (profile.avatarFetched) {
				setAvatar(Buffer.from(profile.avatar.buffer.data).toString('base64'));
			} else if (auth.isAuthenticated && !profile.error) {
				dispatch(getAvatar(auth.user._id));
			}
		}
	}, [auth, profile]);

	return (
		<Flex
			as='nav'
			align='center'
			justify='space-between'
			w='100%'
			px='15px'
			py='20px'
			h={'8vh'}
			bgColor={'white'}
			{...props}>
			<Flex justify='center'>
				<Box display={{ base: 'block', md: 'none' }}>
					<HamburgerIcon boxSize={6} />
				</Box>

				<Flex mr='15px'>
					<Box onClick={() => router.push('/')}>
						<Image
							src='/vectors/atlacity-logo.png'
							width={'72px'}
							height={'62px'}
							layout='fixed'
							cursor={'pointer'}
						/>
					</Box>
				</Flex>

				<Flex align='center' justify='center'>
					<MenuItems {...props.itemProps} to='/explore'>
						Explore
					</MenuItems>
					<MenuItems {...props.itemProps} to='/cities'>
						Cities
					</MenuItems>
					<MenuItems {...props.itemProps} to='/blogs'>
						Blog
					</MenuItems>
					<MenuItems {...props.itemProps} to='/about'>
						About
					</MenuItems>
				</Flex>
			</Flex>
			<Flex align='center' justify='center'>
				{!isAuthenticated ? (
					<Fragment>
						<Box mr={'20px'}>
							<Button onClick={() => router.push('/auth/login')}>Login</Button>
						</Box>
						<Box>
							<Button onClick={() => router.push('/auth/register')}>Register</Button>
						</Box>
					</Fragment>
				) : (
					<Flex mr={'20px'} alignItems={'center'}>
						<Avatar
							cursor={'pointer'}
							onClick={goToProfile}
							mr={'10px'}
							boxSize={'40px'}
							src={avatar && `data:image/png;base64,${avatar}`}
							name={`${auth.user.firstName} ${auth.user.lastName}`}
						/>

						<Menu>
							<MenuButton>
								<RiArrowDownSFill size={'20px'} onClick={() => setShowMenu(!showMenu)} />
							</MenuButton>
							<MenuList
								mt={'20px'}
								minW={0}
								w={'auto'}
								p={'10px'}
								borderRadius={'10px'}
								color={'blue.500'}>
								<MenuItem onClick={() => router.push('/user/profile')}>
									<CgProfile />
									<Text ml={'10px'} as='span'>
										Profile
									</Text>
								</MenuItem>
								<MenuItem onClick={() => router.push('/user/settings')}>
									<FiSettings />
									<Text ml={'10px'} as='span'>
										Settings
									</Text>
								</MenuItem>
								<MenuItem onClick={handleLogout}>
									<FiLogOut />
									<Text ml={'10px'} as='span'>
										Logout
									</Text>
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default Navbar;
