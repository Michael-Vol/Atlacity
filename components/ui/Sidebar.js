import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const Sidebar = (props) => {
	return (
		<Flex
			p={'20px'}
			flexDir={'column'}
			bgColor={props.bgColor || 'blue.500'}
			h={'100%'}
			transition={'0.2s ease-in-out'}
			{...props}>
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
