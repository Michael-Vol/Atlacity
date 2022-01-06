import React from 'react';
import Navbar from '../../components/sections/Landing/Navbar';
import CitySearchLayout from '../../components/layouts/cities/CitySearchLayout';
import { Flex } from '@chakra-ui/react';
const CityPage = () => {
	const imageURL =
		'https://images.unsplash.com/photo-1415025148099-17fe74102b28?&fit=clip&w=1010&h=710&q=100&dpr=1000';
	return (
		<Flex flexDir={'column'} bgImage={`url(${imageURL})`} bgSize={'cover'} bgRepeat={'no-repeat'}>
			<Navbar bgColor={'none'} itemProps={{ color: 'white' }} />
			<CitySearchLayout />
		</Flex>
	);
};

export default CityPage;
