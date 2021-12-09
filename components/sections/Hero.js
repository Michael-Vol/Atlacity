import React from 'react';
import { Grid, GridItem, Text, Flex } from '@chakra-ui/react';
const Hero = () => {
	return (
		<Grid h='78vh' templateRows='repeat(2, 1fr)' templateColumns='repeat(10, 1fr)' gap={2}>
			<GridItem rowSpan={2} colSpan={6} bg='gray.50'>
				<Flex flexDir='column' mx='10%'>
					<Text fontSize='6xl' color='primary' mt='50px'>
						Atlacity
					</Text>
					<Text fontSize='2xl' color='secondary' my='10px'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt perferendis ducimus
						modi harum illum ab tenetur veritatis porro iure velit!
					</Text>
				</Flex>
			</GridItem>
			<GridItem rowSpan={2} colSpan={4} bg='primary' />
		</Grid>
	);
};

export default Hero;
