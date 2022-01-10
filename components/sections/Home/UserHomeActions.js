import React, { useEffect, useState, useRef } from 'react';
import { Flex, Avatar, Text, useToast, useDisclosure } from '@chakra-ui/react';
import Button from '../../ui/Button';
import { MdPlace } from 'react-icons/md';
import { BiPencil } from 'react-icons/bi';
import AddPlaceModal from './AddPlaceModal';
import AddVisitModal from './AddVisitModal';
import { useRouter } from 'next/router';
import { addPlace, addVisit } from '../../../actions/places/places';

import { useDispatch, useSelector } from 'react-redux';
const UserHomeActions = () => {
	const dispatch = useDispatch();
	const toast = useToast();
	const router = useRouter();

	const auth = useSelector((state) => state.auth);
	const { profile, avatar } = useSelector((state) => state.profile);
	const { place } = useSelector((state) => state.places);
	const [avatarFile, setAvatarFile] = useState();
	const [newPlaceSubmitted, setNewPlaceSubmitted] = useState(false);

	const VisitInitialFocusRef = useRef();
	const VisitFinalFocusRef = useRef();
	const { isOpen: VisitIsOpen, onOpen: VisitOnOpen, onClose: VisitOnClose } = useDisclosure();

	const PlaceInitialFocusRef = useRef();
	const PlaceFinalFocusRef = useRef();
	const { isOpen: PlaceIsOpen, onOpen: PlaceOnOpen, onClose: PlaceOnClose } = useDisclosure();

	useEffect(() => {
		if (!avatar.isLoading && !avatarFile) {
			if (avatar.avatar) {
				setAvatarFile(Buffer.from(avatar.avatar.buffer.data).toString('base64'));
			}
		}
	}, [avatar]);
	const handleAddVisit = (visit) => {
		//Convert to Form Data
		const formData = new FormData();
		visit.photos.forEach((photo) => {
			formData.append('photos', photo);
		});

		for (const key in visit) {
			if (key !== 'photos') {
				formData.append(key, visit[key]);
			}
		}
		dispatch(addVisit(visit.place, formData));
	};
	const handleAddPlace = (place) => {
		setNewPlaceSubmitted(true);
		dispatch(addPlace(place));
	};

	useEffect(() => {
		if (!place.isLoading && newPlaceSubmitted) {
			if (place.place) {
				setNewPlaceSubmitted(false);
				router.push(`/places/${place.place._id}`);
			} else if (place.error) {
				toast({
					title: place.error.message,
					status: 'error',
					duration: 2000,
					isClosable: true,
				});
			}
		}
	}, [place]);

	return (
		<Flex mt={'20px'} bg={'#fff'} p={'20px'} rounded={'md'} flexDir={'column'}>
			<Flex alignItems={'center'} w={'100%'}>
				<Avatar
					cursor={'pointer'}
					mr={'10px'}
					boxSize={'40px'}
					src={avatarFile && `data:image/png;base64,${avatarFile}`}
					name={`${auth.user.firstName} ${auth.user.lastName}`}
				/>
				<Button
					bgColor={'white'}
					_hover={{ bgColor: 'gray.200' }}
					color={'blue.700'}
					rounded={'2xl'}
					w={'100%'}
					ml={'10px'}
					textAlign={'left'}
					onClick={VisitOnOpen}>
					<Flex textAlign={'left'}>Add your latest visit</Flex>
					<AddVisitModal
						initialFocusRef={VisitInitialFocusRef}
						finalFocusRef={VisitFinalFocusRef}
						isOpen={VisitIsOpen}
						onClose={VisitOnClose}
						onSubmit={handleAddVisit}
					/>
				</Button>
			</Flex>
			<Flex fontWeight={'500'} mt={'20px'} justifyContent={'space-around'} alignContent={'center'}>
				<Button
					onClick={PlaceOnOpen}
					bgColor={'#fff'}
					_hover={{ bgColor: 'gray.200' }}
					color={'blue.700'}
					w={'100%'}
					mx={'20px'}>
					<Flex fontSize={'18px'}>
						<MdPlace />
						<Text ml={'10px'}>New Place</Text>
						<AddPlaceModal
							initialFocusRef={PlaceInitialFocusRef}
							finalFocusRef={PlaceFinalFocusRef}
							isOpen={PlaceIsOpen}
							onClose={PlaceOnClose}
							onSubmit={handleAddPlace}
						/>
					</Flex>
				</Button>
				<Button
					bgColor={'#fff'}
					_hover={{ bgColor: 'gray.200' }}
					color={'blue.700'}
					w={'100%'}
					mx={'20px'}>
					<Flex fontSize={'18px'}>
						<BiPencil />

						<Text ml={'10px'}>New Blog Post</Text>
					</Flex>
				</Button>
			</Flex>
		</Flex>
	);
};

export default UserHomeActions;
