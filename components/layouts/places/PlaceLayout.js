import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
const PlaceLayout = () => {
	const auth = useSelector((state) => state.auth);
	const { place } = useSelector((state) => state.places);

	return (
		<Flex>
			<h1>Place : {place.place.name}</h1>
		</Flex>
	);
};

export default PlaceLayout;
