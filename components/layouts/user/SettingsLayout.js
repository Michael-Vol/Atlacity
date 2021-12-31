import React, { useState, useEffect } from 'react';
import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Sidebar from '../../ui/Sidebar';
import SidebarItem from '../../ui/SidebarItem';
import { FiLock } from 'react-icons/fi';
import { VscAccount } from 'react-icons/vsc';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import AccountInfo from '../../sections/User/Settings/AccountInfo';
import ChangePassword from '../../sections/User/Settings/ChangePassword';
import Favourites from '../../sections/User/Settings/Favourites';
import withAuth from '../../../lib/checkAuthClient';

const SettingsLayout = () => {
	const [activeOption, setActiveOption] = useState('account-info');

	const renderActiveOption = () => {
		switch (activeOption) {
			case 'account-info':
				return <AccountInfo />;
			case 'change-password':
				return <ChangePassword />;
			case 'favourites':
				return <Favourites />;
			default:
				return <AccountInfo />;
		}
	};

	return (
		<Grid height={'90vh'} templateRows='repeat(1, 1fr)' templateColumns='repeat(20, 1fr)' gap={1}>
			<GridItem w={'260px'} rowSpan={'1'}>
				<Sidebar header='Settings'>
					<SidebarItem
						active={'account-info' === activeOption}
						onClick={() => setActiveOption('account-info')}>
						<VscAccount size={30} />
						<Text as='span' ml={'16px'}>
							Account Info
						</Text>
					</SidebarItem>
					<SidebarItem
						active={'change-password' === activeOption}
						onClick={() => setActiveOption('change-password')}>
						<Flex justifyItems={'center'}>
							<FiLock size={30} />
							<Text as='span' ml={'16px'}>
								Change Password
							</Text>
						</Flex>
					</SidebarItem>
					<SidebarItem
						active={'favourites' === activeOption}
						onClick={() => setActiveOption('favourites')}>
						<Flex justifyItems={'center'}>
							<BsFillBookmarkHeartFill size={30} />
							<Text as='span' ml={'16px'}>
								Favourites
							</Text>
						</Flex>
					</SidebarItem>
				</Sidebar>
			</GridItem>
			<GridItem colSpan={16} mt={'40px'} ml={'20px'} p={'20px'} maxW={'80%'}>
				{renderActiveOption()}
			</GridItem>
		</Grid>
	);
};

export default withAuth(SettingsLayout);
