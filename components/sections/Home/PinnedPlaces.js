import React, { useEffect } from 'react';
import { Flex, Text, Divider, Spinner } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getPinnedPlaces } from '../../../actions/places/places';
import { GoLocation } from 'react-icons/go';
import Link from 'next/link';

const PinnedPlaces = () => {
	const dispatch = useDispatch();
	const { pinned } = useSelector((state) => state.places);
	useEffect(() => {
		if (!pinned.isLoading) {
			dispatch(getPinnedPlaces());
		}
	}, []);
	return (
		<Flex justifyContent={'center'} flexDir={'column'}>
			<Divider />
			<Text mt={'5px'} fontSize={'18px'} fontWeight={'500'}>
				Pinned Places
			</Text>
			{!pinned.isLoading ? (
				<Flex px={'10px'} flexDir={'column'} mt={'10px'} fontSize={'16px'} color={'gray.800'}>
					{pinned.places.length > 0 &&
						pinned.places.map((place) => (
							<Link key={place._id} href={`/places/${place._id}`}>
								<Flex alignItems={'center'} _hover={{ cursor: 'pointer' }}>
									<GoLocation size={'1em'} />
									<Text ml={'5px'} fontSize={'1em'}>
										{place.name}
									</Text>
								</Flex>
							</Link>
						))}
				</Flex>
			) : (
				<Spinner boxSize={'1.2em'} />
			)}
		</Flex>
	);
};

export default PinnedPlaces;
