import React from 'react';
import { Button } from '@chakra-ui/react';
const Btn = (props) => {
	return (
		<Button
			ml={props.isFirst && '20px'}
			size={props.size || 'md'}
			rounded='md'
			color={props.colors || 'white'}
			bg={props.bg || 'primary'}
			_hover={props.hover || { bg: 'blue.500' }}
			onClick={props.onClick}>
			{props.children}
		</Button>
	);
};

export default Btn;
