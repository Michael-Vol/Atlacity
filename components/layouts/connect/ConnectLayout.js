import React, { useEffect, useState } from 'react';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import checkAuth from '../../../lib/checkAuthClient';
import HomeSidebar from '../../sections/Home/HomeSidebar';
import ConnectUsers from '../../sections/Connnect/ConnectUsers';

const ConnectLayout = () => {
	return (
		<Flex h={'93vh'}>
			<Grid templateColumns={'repeat(20,1fr)'} gap={2}>
				<GridItem colSpan={3}>
					<HomeSidebar />
				</GridItem>
				<GridItem colSpan={17} p={'20px'} color={'blue.800'} overflow={'scroll'}>
					<ConnectUsers />
				</GridItem>
			</Grid>
		</Flex>
	);
};

export default checkAuth(ConnectLayout);
