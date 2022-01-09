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
import { BsFillDoorOpenFill } from 'react-icons/bs';
import { IoMdPhotos } from 'react-icons/io';
import { MdLocationPin } from 'react-icons/md';
import { AiOutlineInfoCircle, AiOutlineStar } from 'react-icons/ai';
import PlaceCarousel from '../../sections/places/PlaceCarousel';
import PlaceVisits from '../../sections/Places/PlaceVisits';

const PlaceLayout = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const toast = useToast();

	const auth = useSelector((state) => state.auth);
	const { place } = useSelector((state) => state.places);

	const [activeTab, setActiveTab] = useState('visits');

	const renderactiveTab = () => {
		switch (activeTab) {
			case 'visits':
				return <PlaceVisits placeId={place.place._id} />;
			default:
				return <PlaceVisits placeId={place.place._id} />;
		}
	};

	useEffect(() => {
		console.log(router.query.placeId, place.isLoading);
		if (router.query.placeId && !place.isLoading) {
			dispatch(getPlace(router.query.placeId));
		}
	}, [router.query]);

	useEffect(() => {
		if (place.error) {
			if (!toast.isActive('error-toast')) {
				toast({
					id: 'error-toast',
					title: 'Error',
					description: place.error.message,
					status: 'error',
					duration: 4000,
					isClosable: true,
				});
			}
		}
	}, [place]);

	return (
		<Flex flexDir={'column'}>
			{place.placeLoaded ? (
				<Flex flexDir={'column'}>
					<Grid
						templateColumns={'repeat(20,1fr)'}
						h={'70vh'}
						color={'white'}
						bgColor={'blue.800'}
						w={'100%'}
						flexDir={'column'}>
						<GridItem colSpan={11} p={'50px'}>
							<Flex flexDir={'column'}>
								<Heading fontSize={'48px'}>{place.place.name}</Heading>
								<Flex alignItems={'center'} mt={'10px'}>
									<MdLocationPin />
									<Text ml={'10px'} fontSize={'16px'} mt={'5px'}>
										{place.place.address} in {place.place.city.name},{' '}
										{place.place.city.info.state},{' '}
										{place.place.city.info.country_code.toUpperCase()}
									</Text>
								</Flex>
								<Flex mt={'10px'} alignItems={'center'}>
									<AiOutlineInfoCircle />
									<Text ml={'10px'}>{place.place.description}</Text>
								</Flex>
							</Flex>
							<Flex
								flexDir={'column'}
								fontWeight={'400'}
								fontSize={'20px'}
								mt={'20px'}
								mx={'20px'}>
								<Flex alignItems={'center'}>
									<BsFillDoorOpenFill />
									<Text ml={'10px'}>{place.place.visitors.length} Visitors</Text>
								</Flex>
								<Flex mt={'10px'} alignItems={'center'}>
									<IoMdPhotos />
									<Text ml={'10px'}>{place.place.photos.length} Photos</Text>
								</Flex>
								<Flex mt={'10px'} alignItems={'center'}>
									<AiOutlineStar />
									<Text ml={'10px'}>0 Ratings</Text>
								</Flex>
							</Flex>
						</GridItem>
						<GridItem colSpan={9} bgColor={'gray.800'}>
							<PlaceCarousel photos={place.place.photos} />
						</GridItem>
					</Grid>
					<Flex h={'7vh'} color={'blue.800'}>
						<Tabs colorScheme={'blue'} size={'lg'} w={'100%'} variant={'enclosed'}>
							<TabList>
								<Tab onClick={() => setActiveTab('visits')}> Visits</Tab>
								<Tab onClick={() => setActiveTab('faq')}> FAQ</Tab>
							</TabList>
						</Tabs>
					</Flex>
					{renderactiveTab()}
				</Flex>
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
