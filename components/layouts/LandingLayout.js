import React from 'react';
import { Flex, VStack, Grid, GridItem } from '@chakra-ui/react';
import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
const LandingLayout = (props) => {
	return (
		<Grid
			{...props}
			minH={'100vh'}
			templateRows='repeat(10, 1fr)'
			templateColumns='repeat(1, 1fr)'
			gap={0}>
			<GridItem rowSpan={1}>
				<Navbar />
			</GridItem>
			<GridItem rowSpan={9}>
				<Hero />
			</GridItem>
			{props.childen}
		</Grid>
	);
};

export default LandingLayout;
