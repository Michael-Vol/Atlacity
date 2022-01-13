import React, { useEffect, useState, useRef } from 'react';
import { Flex, Avatar, Text, Heading, Grid, GridItem } from '@chakra-ui/react';
import Link from 'next/link';
import { BsFillDoorOpenFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import axios from 'axios';

const PinnedPlaceItem = ({ feedItem }) => {
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
					added
				</Text>
				<Link href={`/places/${item._id}`}>
					<Text as={'span'} ml={'5px'} color={'blue.800'} cursor={'pointer'}>
						{item.name}
					</Text>
				</Link>
				<Text as={'span'} ml={'5px'} color={'gray'}>
					to favourites.
				</Text>
			</Flex>
		</Flex>
	);
};

export default PinnedPlaceItem;
