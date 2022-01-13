import React, { useEffect } from 'react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Flex, Text, Image } from '@chakra-ui/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FiCameraOff } from 'react-icons/fi';

SwiperCore.use([Pagination, Navigation]);

const PlaceCarousel = ({ photos }) => {
	return (
		<Flex h={'100%'} w={'400px'}>
			{photos.length > 0 ? (
				<Swiper
					slidesPerView={1}
					spaceBetween={30}
					loop={true}
					pagination={{
						clickable: true,
					}}
					navigation={photos.length > 0}
					className='mySwiper'>
					{photos.map((photo, index) => {
						return (
							<SwiperSlide key={index}>
								<Image
									width={'100%'}
									height={'100%'}
									src={`data:image/jpg;base64,${Buffer.from(photo.buffer)}`}
									alt={photo.name}
								/>
							</SwiperSlide>
						);
					})}
				</Swiper>
			) : (
				<Flex justifyContent={'center'} w={'100%'} alignItems={'center'} flexDir={'column'}>
					<FiCameraOff size={'4em'} />
					<Text mt={'10px'} fontSize={'22px'}>
						No Photos yet
					</Text>
				</Flex>
			)}
		</Flex>
	);
};

export default PlaceCarousel;
