import React, { useState, useEffect } from 'react';
import { InputGroup, Input, InputRightElement, Flex, Text, Spinner } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { searchCities } from '../../../actions/cities/city';
import { MdOutlineClear } from 'react-icons/md';

const PlaceResults = ({ onSelect }) => {
	const [input, setInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [citySelected, setCitySelected] = useState(false);
	const dispatch = useDispatch();
	const cities = useSelector((state) => state.cities);

	useEffect(() => {
		handleSearch();
		if (input.length <= 2) {
			setSearchResults([]);
			setIsSearching(false);
		}
	}, [input]);

	const handleSearch = () => {
		if (input.length > 2 && !citySelected) {
			setIsSearching(true);
			return dispatch(searchCities(input));
		}
		setSearchResults([]);
	};
	const resetSearch = () => {
		setInput('');
		setSearchResults([]);
		setIsSearching(false);
		setCitySelected(false);
	};
	useEffect(() => {
		const { search } = cities;
		if (!search.isLoading) {
			if (search.error) {
				setIsSearching(false);
				return console.log(search.error);
			} else {
				setIsSearching(false);
				setSearchResults(search.results);
			}
		}
	}, [cities.search]);
	return (
		<Flex w={'100%'} bgColor={'white'} rounded='md' flexDir={'column'}>
			<InputGroup rounded={'xl'}>
				<Input
					placeholder='Search'
					size='md'
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<InputRightElement mt={'4px'} cursor={'pointer'} onClick={handleSearch}>
					{citySelected ? (
						<MdOutlineClear onClick={resetSearch} size={'1.5em'} />
					) : isSearching ? (
						<Spinner boxSize={'1.5em'} />
					) : (
						<BiSearch size={'1.5em'} />
					)}
				</InputRightElement>
			</InputGroup>
			{input.length > 0 && (
				<Flex flexDir={'column'} bgColor={'gray.100'} borderRadius={'10px'} pb={'0px'}>
					{searchResults.map((city, index) => (
						<Flex
							key={index}
							bgColor={'gray.100'}
							cursor={'pointer'}
							w={'100%'}
							p={'10px'}
							onClick={() => {
								onSelect(city);
								setInput(`${city.name}, ${city.info.state}, ${city.info.country}`);
								setCitySelected(true);
								setSearchResults([]);
							}}
							_hover={{
								bgColor: 'gray.300',
							}}>
							<Text px={'20px'} fontSize={'20px'}>
								{city.name}, {city.info.state}, {city.info.country}
							</Text>
						</Flex>
					))}
				</Flex>
			)}
		</Flex>
	);
};

export default PlaceResults;
