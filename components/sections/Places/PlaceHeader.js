import React from 'react';
import { Grid, GridItem, Text, Flex, Heading } from '@chakra-ui/react';
import { MdLocationPin } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsFillDoorOpenFill, BsFillTelephoneFill } from 'react-icons/bs';
import { IoMdPhotos } from 'react-icons/io';
import { AiOutlineStar } from 'react-icons/ai';

import PlaceCarousel from './PlaceCarousel';

const PlaceHeader = ({ place }) => {
	return (
		<Grid
			templateColumns={'repeat(20,1fr)'}
			h={'70vh'}
			color={'white'}
			bgColor={'blue.800'}
			w={'100%'}
			flexDir={'column'}>
			<GridItem colSpan={9} p={'50px'}>
				<Flex flexDir={'column'}>
					<Heading fontSize={'48px'}>{place.name}</Heading>
					<Text fontSize={'18px'}>{place.category}</Text>
					<Flex alignItems={'center'} mt={'10px'}>
						<MdLocationPin />
						<Text ml={'10px'} fontSize={'16px'} mt={'5px'}>
							{place.address} in {place.city.name}, {place.city.info.state},{' '}
							{place.city.info.country_code.toUpperCase()}
						</Text>
					</Flex>
					<Flex mt={'10px'} alignItems={'center'}>
						<AiOutlineInfoCircle />
						<Text ml={'10px'}>{place.description}</Text>
					</Flex>
					<Flex mt={'10px'} alignItems={'center'}>
						<BsFillTelephoneFill />
						<Text ml={'10px'}> {place.telephone} </Text>
					</Flex>
				</Flex>
				<Flex flexDir={'column'} fontWeight={'400'} fontSize={'18px'} mt={'10px'}>
					<Flex alignItems={'center'}>
						<BsFillDoorOpenFill />
						<Text ml={'10px'}>{place.visitors.length} Visitors</Text>
					</Flex>
				</Flex>
			</GridItem>
			<GridItem colSpan={11} bgColor={'gray.800'}>
				<PlaceCarousel photos={place.photos} />
			</GridItem>
		</Grid>
	);
};

export default PlaceHeader;
