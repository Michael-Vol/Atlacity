import React from 'react';
import { Button } from '@chakra-ui/react';
const Btn = (props) => {
	const { color, hover } = props;
	return (
		<Button size='md' rounded='md' color='white' bg={color} _hover={hover}>
			{props.children}
		</Button>
	);
};

export default Btn;
