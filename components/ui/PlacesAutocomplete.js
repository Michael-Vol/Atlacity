import React, { useState, useEffect } from 'react';
import { Box, Input, Flex, Text, Icon } from '@chakra-ui/react';
const { useDispatch, useSelector } = require('react-redux');

import { placesAutocomplete } from '../../actions/places/autocomplete';
import { FaLocationArrow } from 'react-icons/fa';

const PlacesAutocomplete = () => {
	const autocompleteState = useSelector((state) => state.placesAutocomplete);

	const [searchTerm, setSearchTerm] = useState('');
	const [options, setOptions] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [selectedLocationName, setSelectedLocationName] = useState('');
	const dispatch = useDispatch();
	useEffect(() => {
		if (searchTerm !== '' && selectedLocationName !== searchTerm) {
			setOptions([]);
			setSelectedLocation(null);
			setTimeout(() => {
				dispatch(placesAutocomplete(searchTerm, 3));
			}, 500);
		}
	}, [searchTerm]);

	useEffect(() => {
		if (autocompleteState.places) {
			setOptions(autocompleteState.places);
		}
	}, [autocompleteState]);

	const selectLocation = (location) => {
		setSelectedLocation(location);
		setOptions([]);

		const name = location.properties.name ? `${location.properties.name + ', '}` : '';
		const county = location.properties.county ? `${location.properties.county + ', '}` : '';
		const country = location.properties.country ? `${location.properties.country + ''}` : '';
		const fullName = name + county + country;
		setSearchTerm(fullName);
		setSelectedLocationName(fullName);
	};

	return (
		<Box>
			<Input
				value={searchTerm}
				placeholder='Location'
				onChange={(field) => setSearchTerm(field.target.value)}
			/>
			{options.length > 0 && searchTerm !== '' && (
				<Flex flexDir={'column'} bg='gray.50' rounded={'md'} p={'10px'}>
					{options.map((option, index) => (
						<Box
							key={index}
							mt={'5px'}
							minW={'100%'}
							rounded={'md'}
							p={'5px'}
							_hover={{ bg: 'gray.100' }}
							onClick={() => selectLocation(option)}>
							<Icon as={FaLocationArrow} boxSize={'14px'} mr={'5px'} />
							<Text as='span'>
								{option.properties.name && `${option.properties.name}, `}
								{option.properties.county && `${option.properties.county}, `}
								{option.properties.country}
							</Text>
						</Box>
					))}
				</Flex>
			)}
		</Box>
	);
};

export default PlacesAutocomplete;
