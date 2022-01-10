import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { GiArchiveResearch } from 'react-icons/gi';

const PlaceNotFound = () => {
	return (
		<Flex h={'80vh'} justifyContent={'center'} alignItems={'center'} flexDir={'column'}>
			<GiArchiveResearch size={'4em'} />
			<Text fontSize={'42px'} fontWeight={'400'}>
				Place not found
			</Text>
			<Link href={'/'}>
				<Text cursor={'pointer'} color={'blue.800'} fontSize={'18px'}>
					Return to Homepage
				</Text>
			</Link>
		</Flex>
	);
};

export default PlaceNotFound;
