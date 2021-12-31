import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import SidebarItem from './SidebarItem';

const Sidebar = (props) => {
	return (
		<Flex p={'20px'} flexDir={'column'} bgColor={props.bgColor || 'blue.500'} h={'100%'}>
			{props.header && (
				<Heading fontSize={'32px'} color={'white'} mb={'20px'}>
					{props.header}
				</Heading>
			)}
			{props.children}
		</Flex>
	);
};

export default Sidebar;
