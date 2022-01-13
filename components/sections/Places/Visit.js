import React, { useEffect, useState } from 'react';
import { Flex, Text, Avatar } from '@chakra-ui/react';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';

const Visit = ({ visit }) => {
	const [avatar, setAvatar] = useState(null);

	useEffect(() => {
		const getAvatar = async () => {
			const res = await axios.get(`/api/users/${visit.visitor._id}/avatar`);
			const { exists, avatar } = res.data;
			if (exists) {
				setAvatar(Buffer.from(avatar.buffer.data).toString('base64'));
			}
		};
		getAvatar();
	}, []);

	return (
		<Flex my={'5px'} flexDir={'column'} rounded={'md'} bgColor={'white'} p={'20px'}>
			<Flex justifyContent={'space-between'} alignItems={'center'} my={'10px'}>
				<Flex alignItems={'center'}>
					<Avatar src={avatar && `data:image/png;base64,${avatar}`} />

					<Text fontSize={'16px'} ml={'20px'}>
						{visit.visitor.firstName}{' '}
						{visit.isRecommended ? (
							<Text as={'span'} color={'green.500'}>
								recommends this place
							</Text>
						) : (
							<Text as={'span'} color={'red.500'}>
								does not recommend this place
							</Text>
						)}
					</Text>
				</Flex>
				<Text>{new Date(visit.date).toDateString()}</Text>
			</Flex>
			<Text mt={'10px'} fontSize={'20px'} fontWeight={'600'}>
				{visit.title}
			</Text>
			<ReactStars
				count={5}
				size={30}
				value={visit.rating}
				edit={false}
				isHalf={true}
				emptyIcon={<i className='far fa-star'></i>}
				halfIcon={<i className='fa fa-star-half-alt'></i>}
				fullIcon={<i className='fa fa-star'></i>}
				activeColor='#ffd700'
			/>
			<Text mt={'10px'} fontSize={'16px'}>
				{visit.description}
			</Text>
		</Flex>
	);
};

export default Visit;
