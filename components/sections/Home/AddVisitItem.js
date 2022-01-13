import React, { useEffect, useState, useRef } from 'react';
import { Flex, Avatar, Text, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';

const AddVisitItem = ({ feedItem }) => {
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
					visited
				</Text>
				<Link href={`/places/${item._id}`}>
					<Text as={'span'} ml={'5px'} color={'blue.800'} cursor={'pointer'}>
						{item.place.name}
					</Text>
				</Link>
				<Text as={'span'} ml={'5px'} color={'gray'}>
					and
				</Text>
				{item.isRecommended ? (
					<Text as={'span'} ml={'5px'} color={'green.500'}>
						recommends this place
					</Text>
				) : (
					<Text as={'span'} ml={'5px'} color={'red.500'}>
						does not recommend this place
					</Text>
				)}
			</Flex>
			<Flex mt={'10px'} flexDir={'column'}>
				<ReactStars
					count={5}
					size={30}
					value={item.rating}
					edit={false}
					isHalf={true}
					emptyIcon={<i className='far fa-star'></i>}
					halfIcon={<i className='fa fa-star-half-alt'></i>}
					fullIcon={<i className='fa fa-star'></i>}
					activeColor='#ffd700'
				/>
				<Text mt={'10px'} fontSize={'16px'}>
					{item.description}
				</Text>
			</Flex>
		</Flex>
	);
};

export default AddVisitItem;
