import React, { useEffect, useState, useRef } from 'react';
import { Flex, Avatar, Text, Heading, Grid, GridItem } from '@chakra-ui/react';
import Link from 'next/link';
import { BsFillDoorOpenFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlaceItemCarousel from './PlaceItemCarousel';
import axios from 'axios';

const AddPlaceItem = ({ feedItem }) => {
	const { itemCreator, item, itemType } = feedItem;

	const [avatarFile, setAvatarFile] = useState(null);
	const mountedRef = useRef(true);
	useEffect(() => {
		const getAvatar = async () => {
			let res = await axios.get(`/api/users/${itemCreator._id}/avatar`);
			if (!mountedRef.current) return null;
			const { exists, avatar } = res.data;
			if (exists) {
				setAvatarFile(Buffer.from(avatar.buffer.data).toString('base64'));
			}
		};
		getAvatar();

		return () => {
			mountedRef.current = false;
		};
	}, []);
	return (
		<Flex flexDir={'column'}>
			<Flex alignItems={'center'}>
				<Link href={`/users/${itemCreator._id}/profile`}>
					<Flex alignItems={'center'} cursor={'pointer'}>
						<Avatar
							src={avatarFile && `data:image/png;base64,${avatarFile}`}
							name={`${itemCreator.firstName} ${itemCreator.lastName}`}
							size={'sm'}
						/>
						<Text ml={'10px'} fontWeight={'500'}>
							{itemCreator.firstName} {itemCreator.lastName}
						</Text>
					</Flex>
				</Link>
				<Text as={'span'} ml={'5px'} color={'gray'}>
					added a new place:
				</Text>
				<Link href={`/places/${item._id}`}>
					<Text as={'span'} ml={'5px'} color={'blue.800'} cursor={'pointer'}>
						{item.name}
					</Text>
				</Link>
			</Flex>
			<Grid templateColumns={'repeat(2,1fr)'} mt={'20px'}>
				<GridItem colSpan={1}>
					<Flex flexDir={'column'} px={'10px'}>
						<Flex mt={'20px'}>
							<Link href={`/places/${item._id}`}>
								<Heading fontSize={'28px'} cursor={'pointer'}>
									{item.name}
								</Heading>
							</Link>
						</Flex>
						<Flex mt={'20px'} flexDir={'column'} maxW={'350px'}>
							<Flex alignItems={'center'} mt={'5px'}>
								<MdLocationPin />
								<Text ml={'5px'} fontSize={'16px'} mt={'5px'}>
									{item.address} in {item.address}
								</Text>
							</Flex>
							<Flex mt={'5px'} alignItems={'center'}>
								<AiOutlineInfoCircle />
								<Text ml={'5px'}>{item.description}</Text>
							</Flex>
							<Flex mt={'5px'} alignItems={'center'}>
								<BsFillTelephoneFill />
								<Text ml={'5px'}> {item.telephone} </Text>
							</Flex>
							<Flex flexDir={'column'} fontWeight={'400'} fontSize={'18px'} mt={'5px'}>
								<Flex alignItems={'center'}>
									<BsFillDoorOpenFill />
									<Text ml={'5px'}>{item.visitors.length} Visitors</Text>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</GridItem>
				<GridItem colSpan={1}>
					<PlaceItemCarousel photos={item.photos} />
				</GridItem>
			</Grid>
		</Flex>
	);
};

export default AddPlaceItem;
