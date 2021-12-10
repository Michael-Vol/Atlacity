import React from 'react';
import { Grid, GridItem, Text, Flex, Heading, SimpleGrid, Box } from '@chakra-ui/react';
import Button from '../ui/Button';
import Image from 'next/image';

import HeroCard from '../ui/HeroCard';
const Hero = () => {
	return (
		<Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(20, 1fr)' gap={2} height='100vh'>
			<GridItem rowSpan={2} colSpan={8}>
				<Flex flexDir='column' mx='10%'>
					<Heading as='h1' fontSize='6xl' color='primary' mt='50px'>
						Atlacity
					</Heading>
					<Flex flexDirection='column'>
						<Text fontSize='2xl' color='blue.400' mt='20px'>
							Explore new places,
						</Text>
						<Text fontSize='2xl' color='blue.400'>
							Find hidden spots in your city,
						</Text>
						<Text fontSize='2xl' color='blue.400'>
							No matter where you are.
						</Text>
						<Text fontSize={'3xl'} color={'blue.400'} mt='20px'>
							Atlacity is web platform to explore new places in various cities around the world,
							rate shops, and connect with other people with same experiences.
						</Text>
					</Flex>

					<SimpleGrid columns={2} spacing={6} mt='50px'>
						<HeroCard text='Explore and seek out hidden gems' imageName='pin' />
						<HeroCard text={`Rate and comment on places you've been`} imageName='rating' />
						<HeroCard text={`Join an inclusive community`} imageName='community' />
						<HeroCard
							text={`Write blog posts about the places you've visited`}
							imageName='pencil'
						/>
					</SimpleGrid>

					<Flex className='button-group' mt={50} mb={4} flexDirection={'row-reverse'}>
						<Button size='lg' bg='blue.400' isFirst>
							Learn More
						</Button>
						<Button size='lg'>Get Started</Button>
					</Flex>
				</Flex>
			</GridItem>
			<GridItem rowSpan={2} colSpan={12}>
				<div style={{ width: '100%', height: '100%', position: 'relative' }}>
					<Image src='/images/city.png' alt='hero image' layout='fill' />
				</div>
			</GridItem>
		</Grid>
	);
};

export default Hero;
