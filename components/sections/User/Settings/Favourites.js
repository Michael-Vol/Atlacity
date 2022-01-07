import React, { useEffect, useState, useRef } from 'react';
import {
	Flex,
	Heading,
	Text,
	useToast,
	Tag,
	Grid,
	GridItem,
	TagLabel,
	Box,
	useDisclosure,
	Stack,
	Skeleton,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaCity } from 'react-icons/fa';

import AddFavouriteModal from './AddFavouriteModal';
import CityItem from '../../../ui/CityItem';
import { getProfile } from '../../../../actions/profile/profile';
import { addFavourites } from '../../../../actions/profile/profile';
const Favourites = () => {
	const { profile } = useSelector((state) => state.profile);
	const auth = useSelector((state) => state.auth);

	const [dispatched, setDispatched] = useState(false);
	const dispatch = useDispatch();

	const initialFocusRef = useRef();
	const finalFocusRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (!profile.isLoading) {
			dispatch(getProfile(auth.user._id));
		}
	}, []);

	const handleSubmit = (values) => {
		console.log(values);
		dispatch(
			addFavourites(auth.user._id, {
				favourites: values.favouriteCities,
				type: 'favouriteCities',
			})
		);
	};

	return (
		<Flex flexDir={'column'} color={'teal.600'}>
			<Heading fontSize={'38px'} fontWeight={'600'} mb={'20px'}>
				Favourites
			</Heading>

			{profile.profile && profile.profile.favouriteCities && (
				<Flex flexDir={'column'}>
					<Flex
						alignItems={'center'}
						color={'teal.500'}
						justifyContent={'space-between'}
						mb={'30px'}>
						<Flex alignItems={'center'}>
							<FaCity size={25} />
							<Text ml={'10px'} as={'span'} fontSize={'24px'}>
								Favourite Cities
							</Text>
						</Flex>
						<IoMdAddCircleOutline size={25} cursor={'pointer'} onClick={onOpen} />
						<AddFavouriteModal
							type={'city'}
							initialFocusRef={initialFocusRef}
							finalFocusRef={finalFocusRef}
							isOpen={isOpen}
							onClose={onClose}
							onSubmit={handleSubmit}
						/>
					</Flex>
					{profile.isLoading ? (
						<Stack>
							<Skeleton height='20px' />
							<Skeleton height='20px' />
							<Skeleton height='20px' />
						</Stack>
					) : profile.profile.favouriteCities.length > 0 ? (
						<Grid templateRows='repeat(4, 1fr)' templateColumns='repeat(4, 1fr)' gap={2}>
							{profile.profile.favouriteCities.map((city, index) => {
								if (city) {
									return <CityItem city={city} key={index} />;
								}
							})}
						</Grid>
					) : (
						<Text textAlign={'center'} fontSize={'24px'}>
							You have no favourite cities
						</Text>
					)}
				</Flex>
			)}
		</Flex>
	);
};

export default Favourites;
