import React, { useEffect, useState } from 'react';
import { Grid, GridItem, Text, Flex, Heading, Spinner, Skeleton, Stack } from '@chakra-ui/react';
import { MdLocationPin } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsFillDoorOpenFill, BsFillTelephoneFill } from 'react-icons/bs';
import { BsPinAngleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';

import { pinPlace, unpinPlace } from '../../../actions/places/places';
import PlaceCarousel from './PlaceCarousel';

const PlaceHeader = ({ place }) => {
	const dispatch = useDispatch();
	const { pin } = useSelector((state) => state.places);

	const handlePinPlace = () => {
		dispatch(pinPlace(place._id));
	};
	const handleUnpinPlace = () => {
		dispatch(unpinPlace(place._id));
	};

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
					<Flex alignItems={'center'}>
						<Heading fontSize={'48px'} mr={'10px'}>
							{place.name}
						</Heading>
						<Flex
							ml={'5px'}
							alignItems={'center'}
							rounded={'xl'}
							bg={'gray.200'}
							color={'blue.800'}
							onClick={place.isPinned ? handleUnpinPlace : handlePinPlace}
							transition={'all 0.2s ease-in-out'}
							_hover={{
								cursor: 'pointer',
								bgColor: !place.isPinned && 'white',
								color: !place.isPinned && 'blue.600',
							}}
							color={place.isPinned ? 'green.500' : 'blue.600'}
							py={'2px'}
							px={'5px'}>
							<Text mr={'10px'}>{place.isPinned ? 'Pinned' : 'Pin'}</Text>
							{pin.isLoading ? (
								<Spinner boxSize={'1em'} />
							) : place.isPinned ? (
								<BsFillCheckCircleFill size={'1em'} />
							) : (
								<BsPinAngleFill size={'1em'} />
							)}
						</Flex>
					</Flex>
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
