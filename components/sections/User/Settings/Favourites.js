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
	useDisclosure,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from '../../../../actions/profile/profile';
import Link from 'next/link';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaCity } from 'react-icons/fa';

import AddFavouriteModal from './AddFavouriteModal';

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

	return (
		<Flex flexDir={'column'} color={'teal.600'}>
			<Heading fontSize={'38px'} fontWeight={'600'} mb={'20px'}>
				Favourites
			</Heading>

			{profile.favourites && (
				<Flex flexDir={'column'}>
					<Grid templateRows='repeat(5, 1fr)' templateColumns='repeat(5, 1fr)' gap={1}>
						{profile.favourites.favouritePlaces.map((place) => (
							<GridItem>
								<Tag
									name={place.name}
									m={'auto'}
									colorScheme={'green'}
									size={'md'}
									p={'14px'}
									fontSize={'18px'}
									borderRadius={'6px'}>
									{place.name}
								</Tag>
							</GridItem>
						))}
					</Grid>
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
						/>
					</Flex>
					<Grid templateRows='repeat(5, 1fr)' templateColumns='repeat(5, 1fr)' gap={1}>
						{profile.favourites.favouriteCities.map((city) => (
							<Link href={`/city/${city.name}`}>
								<GridItem cursor={'pointer'}>
									<Tag
										m={'auto'}
										name={city.name}
										colorScheme={'teal'}
										size={'md'}
										p={'14px'}
										fontSize={'18px'}
										borderRadius={'6px'}
										w={'100%'}>
										<TagLabel textAlign={'center'}>{city.name}</TagLabel>
									</Tag>
								</GridItem>
							</Link>
						))}
					</Grid>
				</Flex>
			)}
		</Flex>
	);
};

export default Favourites;
