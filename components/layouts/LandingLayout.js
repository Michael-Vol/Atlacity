import React from 'react';
import { Flex } from '@chakra-ui/react';
import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
const LandingLayout = (props) => {
	return (
		<Flex direction='column' {...props} height='100vh'>
			<Navbar />
			<Hero />
			{props.childen}
		</Flex>
	);
};

export default LandingLayout;
