import React from 'react';
import { Flex } from '@chakra-ui/react';
import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
const LandingLayout = (props) => {
	return (
		<Flex direction='column' align='center' m='0 auto' {...props} bgColor='gray.50' h='100vh'>
			<Navbar />
			<Hero />
			{props.childen}
			{/* <h1>Hello there</h1> */}
		</Flex>
	);
};

export default LandingLayout;
