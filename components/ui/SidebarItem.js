import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
const SidebarItem = (props) => {
	return (
		<Flex
			cursor={'pointer'}
			my={'20px'}
			fontWeight={'500'}
			onClick={props.onClick}
			textAlign={'center'}
			transition={'all 0.2s ease-in-out'}
			fontSize={props.fontSize || '18px'}
			color={props.active ? 'white' : 'gray.400'}>
			{props.children}
			{props.active && <Box w={'4px'} ml={'auto'} bgColor={'white'}></Box>}
		</Flex>
	);
};

export default SidebarItem;
