import React, { useEffect, useState } from 'react';
import {
	Flex,
	Stack,
	Text,
	useToast,
	Skeleton,
	Heading,
	Grid,
	GridItem,
	Tabs,
	TabList,
	TabPanels,
	TabPanel,
	Tab,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import checkAuth from '../../../lib/checkAuthClient';
import { getPlace } from '../../../actions/places/places';
import { useRouter } from 'next/router';
import PlaceNotFound from '../../sections/Places/PlaceNotFound';
import PlaceHeader from '../../sections/Places/PlaceHeader';
import PlaceData from '../../sections/Places/PlaceData';

const PlaceLayout = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const toast = useToast();

	const auth = useSelector((state) => state.auth);
	const { place } = useSelector((state) => state.places);

	useEffect(() => {
		if (router.query.placeId && !place.isLoading) {
			dispatch(getPlace(router.query.placeId));
		}
	}, [router.query]);

	return (
		<Flex flexDir={'column'}>
			{!place.isLoading ? (
				place.placeLoaded ? (
					<Flex flexDir={'column'}>
						<PlaceHeader place={place.place} />
						<PlaceData place={place.place} />
					</Flex>
				) : (
					<PlaceNotFound />
				)
			) : (
				<Stack>
					<Skeleton bgColor={'gray.500'} height='100px' />
					<Skeleton bgColor={'gray.500'} height='100px' />
					<Skeleton bgColor={'gray.500'} height='100px' />
				</Stack>
			)}
		</Flex>
	);
};

export default checkAuth(PlaceLayout);
