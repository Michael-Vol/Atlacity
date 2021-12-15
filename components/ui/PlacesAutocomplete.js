import React, { useState, useEffect } from 'react';
import { Box, Input, InputGroup, InputRightElement, Flex, Text, Icon } from '@chakra-ui/react';
const { useDispatch, useSelector } = require('react-redux');

import { placesAutocomplete } from '../../actions/places/autocomplete';
import { FaLocationArrow } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';

const PlacesAutocomplete = ({ onSelectedPlace, type, clearSelectedPlace }) => {
	const autocompleteState = useSelector((state) => state.placesAutocomplete);

	const [searchTerm, setSearchTerm] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const [options, setOptions] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [selectedLocationName, setSelectedLocationName] = useState('');
	const dispatch = useDispatch();

	const searchPlace = () => {
		console.log('searching', searchTerm);
		if (searchTerm.length >= 3 && selectedLocationName !== searchTerm) {
			setIsSearching(true);
			setOptions([]);
			setSelectedLocation(null);
			dispatch(placesAutocomplete(searchTerm, 3));
		}
	};

	useEffect(() => {
		if (autocompleteState.places && isSearching) {
			setIsSearching(false);
			setOptions(autocompleteState.places);
		}
	}, [autocompleteState]);

	const selectLocation = (location) => {
		const name = location.properties.city ? `${location.properties.city + ', '}` : '';
		const county = location.properties.county ? `${location.properties.county + ', '}` : '';
		const country = location.properties.country ? `${location.properties.country + ''}` : '';
		const fullName = name + county + country;
		location.fullName = fullName;
		setSelectedLocation(location);
		onSelectedPlace(location);
		setOptions([]);
		setSearchTerm(fullName);
		setSelectedLocationName(fullName);
	};

	const clearLocation = () => {
		setSelectedLocation(null);
		setSearchTerm('');
		setOptions([]);
		// clearSelectedPlace();
	};

	return (
		<Box id={`${type}`} key={`type-${type}`}>
			<InputGroup>
				<Input
					value={searchTerm}
					placeholder='Location'
					onKeyUp={(e) => e.key === 'Enter' && searchPlace()}
					onChange={(field) => setSearchTerm(field.target.value)}
				/>
				<InputRightElement pr={'2'}>
					{!selectedLocation ? (
						<Icon name='search' as={BsSearch} onClick={searchPlace} />
					) : (
						<Icon name='cancel' as={MdOutlineCancel} onClick={clearLocation} />
					)}
				</InputRightElement>
			</InputGroup>
			{options.length > 0 && searchTerm !== '' && (
				<Flex key={type} id={type} flexDir={'column'} bg='gray.50' rounded={'md'} p={'10px'}>
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
								{option.properties.city && `${option.properties.city}, `}
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
