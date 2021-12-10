import React from 'react';
import { Grid, GridItem, Text, Flex, Heading, SimpleGrid, Box } from '@chakra-ui/react';
import Button from '../ui/Button';
import Image from 'next/image';

import HeroCard from '../ui/HeroCard';
const Hero = () => {
	return (
		<Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(20, 1fr)' gap={2}>
			<GridItem rowSpan={2} colSpan={11} bg='gray.50'>
				<Flex flexDir='column' mx='10%'>
					<Heading as='h1' fontSize='6xl' color='primary' mt='50px'>
						Atlacity
					</Heading>
					<Flex flexDirection='column'>
						<Text fontSize='2xl' color='secondary' mt='20px'>
							Explore new places,
						</Text>
						<Text fontSize='2xl' color='secondary'>
							Find hidden spots in your city,
						</Text>
						<Text fontSize='2xl' color='secondary'>
							No matter where you are.
						</Text>
					</Flex>

					<SimpleGrid columns={2} spacing={6} mt='50px'>
						<HeroCard text='Explore and seek out hidden gems' imageName='pin' />
						<HeroCard text={`Rate and comment on places you've been`} imageName='rating' />
						<HeroCard text={`Join an inclusive community`} imageName='community' />
						<HeroCard
							text={`Write blog posts about the places you've visited`}
							imageName='community'
						/>
					</SimpleGrid>

					<Flex className='button-group' mt={16} mb={4}>
						<Button size='lg' isFirst>
							Get Started
						</Button>
						<Button size='lg' bg='blue.400'>
							Learn More
						</Button>
					</Flex>
				</Flex>
			</GridItem>
			<GridItem rowSpan={2} colSpan={9} bg='primary' />
		</Grid>
	);
};

export default Hero;
