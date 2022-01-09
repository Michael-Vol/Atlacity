import React from 'react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Flex, Text } from '@chakra-ui/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FiCameraOff } from 'react-icons/fi';
SwiperCore.use([Pagination, Navigation]);

const PlaceCarousel = ({ photos }) => {
	return (
		<Flex h={'100%'}>
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
					{photos.map((photo, index) => (
						<SwiperSlide key={index}>
							<img src={photo.url} alt={photo.name} />
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<Flex justifyContent={'center'} w={'100%'} alignItems={'center'} flexDir={'column'}>
					<FiCameraOff size={'4em'} />
					<Text mt={'10px'} fontSize={'22px'}>
						No Photos yet
					</Text>
					<Text mt={'10px'}>Add your own photos of this place by adding a visit.</Text>
				</Flex>
			)}
		</Flex>
	);
};

export default PlaceCarousel;
