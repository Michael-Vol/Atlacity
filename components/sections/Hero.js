import React from 'react';
import { Stack, Image, Text, Flex, Heading, SimpleGrid, Box } from '@chakra-ui/react';
import Button from '../ui/Button';

import HeroCard from '../ui/HeroCard';
const Hero = () => {
	return (
		<Flex direction={'row'} alignItems={'stretch'}>
			<Flex flexDir={'column'} w={{ base: '40%', md: '40%' }} mx={'3%'}>
				<Heading as='h1' fontSize='6xl' color='primary' mt='5%'>
					Atlacity
				</Heading>
				<Text fontSize='2xl' color='blue.500' mt='20px'>
					Explore new places,
				</Text>
				<Text fontSize='2xl' color='blue.500'>
					Find hidden spots in your city,
				</Text>
				<Text fontSize='2xl' color='blue.500'>
					No matter where you are.
				</Text>
				<Text fontSize={'xl'} color={'blue.500'} mt='20px'>
					Atlacity is web platform to explore new places in various cities around the world, rate
					shops, and connect with other people with same experiences.
				</Text>

				<SimpleGrid columns={2} spacing={4} mt='5%'>
					<HeroCard text='Explore and seek out hidden gems' imageName='pin' />
					<HeroCard text={`Rate and comment on places you've been`} imageName='rating' />
					<HeroCard text={`Join an inclusive community`} imageName='community' />
					<HeroCard text={`Write blog posts about the places you've visited`} imageName='pencil' />
				</SimpleGrid>
				<Flex className='button-group' mt={'5%'} mb={4} flexDirection={'row-reverse'}>
					<Button size='lg' bg='blue.500' hover={{ bg: 'blue.1000' }} isFirst>
						Learn More
					</Button>
					<Button size='lg'>Get Started</Button>
				</Flex>
			</Flex>
			<Box flex={1}>
				<Image alt='Hero Image' src='/images/city.png' size='100%' />
			</Box>
		</Flex>
	);
};

export default Hero;
