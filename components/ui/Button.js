import React from 'react';
import { Button } from '@chakra-ui/react';
const Btn = (props) => {
	return (
		<Button
			mr={props.isFirst && '20px'}
			size={props.size || 'md'}
			rounded='md'
			color={props.colors || 'white'}
			bg={props.bg || 'primary'}
			_hover={props.hover || { bg: 'blue.500' }}>
			{props.children}
		</Button>
	);
};

export default Btn;
