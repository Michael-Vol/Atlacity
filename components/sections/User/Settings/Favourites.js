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
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from '../../../../actions/profile/profile';
import Link from 'next/link';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaCity } from 'react-icons/fa';

import AddFavouriteModal from './AddFavouriteModal';
import { addFavourites } from '../../../../actions/profile/profile';

const Favourites = () => {
	const profile = useSelector((state) => state.profile);
	const auth = useSelector((state) => state.auth);

	const [dispatched, setDispatched] = useState(false);
	const dispatch = useDispatch();

	const initialFocusRef = useRef();
	const finalFocusRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (!profile.isLoading) {
			dispatch(getFavourites(auth.user._id));
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
					{profile.profile.favouriteCities.length > 0 ? (
						<Grid templateRows='repeat(4, 1fr)' templateColumns='repeat(4, 1fr)' gap={1}>
							{profile.profile.favouriteCities.map((city, index) => {
								if (city) {
									return (
										<Link key={index} href={`/city/${city.name}`}>
											<GridItem cursor={'pointer'}>
												<Flex
													bgImage={`url(${city.photos.thumb})`}
													mb={'10px'}
													w={'200px'}
													h={'133px'}
													color={'white'}
													borderRadius={'6px'}
													alignItems={'center'}
													justifyContent={'center'}
													transition={'all 0.3s ease-in-out'}
													_hover={{
														boxShadow:
															'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
														transform: 'translateY(-5px)',
													}}>
													<Text
														fontSize={'24px'}
														fontWeight={'700'}
														textAlign={'center'}>
														{city.name}
													</Text>
												</Flex>
											</GridItem>
										</Link>
									);
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
