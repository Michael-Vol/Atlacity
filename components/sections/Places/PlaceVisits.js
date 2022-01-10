import React, { useEffect, useState, useRef } from 'react';
import { Flex, Text, Stack, Skeleton, useToast, useDisclosure } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaceVisits } from '../../../actions/places/places';
import AddVisitModal from '../Home/AddVisitModal';
import Button from '../../ui/Button';

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
			<Flex flexDir={'column'}>
				{visits.visits.length > 0 ? (
					<div></div>
				) : (
					<Flex flex={1} justifyContent={'center'} alignItems={'center'} mt={'20px'}>
						<Text fontSize={'24px'} color={'blue.500'}>
							No visits yet. Be the first to{' '}
							<Text cursor={'pointer'} color={'teal'} as={'span'} onClick={onOpen}>
								add one.
							</Text>
						</Text>
						<AddVisitModal
							initialFocusRef={initialFocusRef}
							finalFocusRef={finalFocusRef}
							isOpen={isOpen}
							onClose={onClose}
						/>
					</Flex>
				)}
			</Flex>
		)
	) : (
		<Stack>
			<Skeleton height='30px' />
			<Skeleton height='30px' />
			<Skeleton height='30px' />
		</Stack>
	);
};

export default PlaceVisits;
