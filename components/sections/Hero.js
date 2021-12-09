import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
const Hero = () => {
	return (
		<Grid h='200px'>
			<GridItem rowSpan={2} colSpan={1} bg='tomato' />
			<GridItem colSpan={2} bg='papayawhip' />
			<GridItem colSpan={2} bg='papayawhip' />
			<GridItem colSpan={4} bg='tomato' />
		</Grid>
	);
};

export default Hero;
