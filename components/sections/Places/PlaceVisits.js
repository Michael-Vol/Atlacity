import React, { useEffect, useState, useRef } from 'react';
import { Flex, Text, Stack, Skeleton, useToast, useDisclosure } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaceVisits } from '../../../actions/places/places';
import AddVisitModal from '../Home/AddVisitModal';
import Button from '../../ui/Button';
import { addVisit } from '../../../actions/places/places';
import Visit from './Visit';

const PlaceVisits = ({ placeId }) => {
	const toast = useToast();
	const dispatch = useDispatch();
	const { visits } = useSelector((state) => state.places);

	const initialFocusRef = useRef();
	const finalFocusRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (!visits.isLoading) {
			dispatch(getPlaceVisits(placeId));
		}
	}, []);

	const handleSubmit = async (visit) => {
		//Convert to Form Data
		const formData = new FormData();

		console.log(visit.photos);
		visit.photos.forEach((photo) => {
			formData.append('photos', photo);
		});

		for (const key in visit) {
			if (key !== 'photos') {
				formData.append(key, visit[key]);
			}
		}
		dispatch(addVisit(placeId, formData));
	};

	useEffect(() => {
		if (!visits.isLoading && visits.error) {
			toast({
				title: visits.error.message || `Couldn't load visits`,
				status: 'error',
				duration: 4000,
				isClosable: true,
			});
		}
	}, [visits]);

	return !visits.isLoading ? (
		visits.visitsLoaded && (
			<Flex flex={1} justifyContent={'center'} alignItems={'center'} mt={'20px'}>
				{visits.visits.length > 0 ? (
					<Flex
						my={'20px'}
						mx={'20vh'}
						bgColor={'blue.50'}
						p={'20px'}
						rounded={'md'}
						w={'80%'}
						flexDir={'column'}>
						<Flex justifyContent={'space-between'} alignItems={'center'}>
							<Text fontSize={'22px'} color={'blue.800'}>
								Visits
							</Text>
							<Button bgColor={'blue.700'} _hover={{ bgColor: 'blue.800' }} onClick={onOpen}>
								Add Visit
							</Button>
						</Flex>
						<Flex flexDir={'column'} my={'20px'}>
							{visits.visits.map((visit) => (
								<Visit visit={visit} key={visit._id} />
							))}
						</Flex>
						<AddVisitModal
							isInPlace
							initialFocusRef={initialFocusRef}
							finalFocusRef={finalFocusRef}
							isOpen={isOpen}
							onClose={onClose}
							onSubmit={handleSubmit}
						/>
					</Flex>
				) : (
					<Flex>
						<Text fontSize={'24px'} color={'blue.500'}>
							No visits yet. Be the first to{' '}
							<Text cursor={'pointer'} color={'teal'} as={'span'} onClick={onOpen}>
								add one.
							</Text>
						</Text>
						<AddVisitModal
							isInPlace
							initialFocusRef={initialFocusRef}
							finalFocusRef={finalFocusRef}
							isOpen={isOpen}
							onClose={onClose}
							onSubmit={handleSubmit}
						/>
					</Flex>
				)}
			</Flex>
		)
	) : (
		<Stack mt={'20px'} p={'50px'}>
			<Skeleton startColor='gray.500' height='15px' />
			<Skeleton startColor='gray.500' height='15px' w={'75%'} />
			<Skeleton startColor='gray.500' height='15px' w={'50%'} />
			<Skeleton startColor='gray.500' height='15px' w={'20%'} />
		</Stack>
	);
};

export default PlaceVisits;
