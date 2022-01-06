import React, { useState, useEffect } from 'react';
import { InputGroup, Input, InputRightElement, Flex, Text, Spinner } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { searchCities } from '../../../../actions/cities/city';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

const CityResults = () => {
	const [input, setInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const dispatch = useDispatch();
	const cities = useSelector((state) => state.cities);

	useEffect(() => {
		handleSearch();
	}, [input]);

	const handleSearch = () => {
		if (input.length > 2) {
			setIsSearching(true);
			return dispatch(searchCities(input));
		}
		setSearchResults([]);
	};
	useEffect(() => {
		const { search } = cities;
		if (!search.isLoading) {
			if (search.error) {
				setIsSearching(false);
				return console.log(search.error);
			} else if (search.results.length > 0) {
				setIsSearching(false);
				setSearchResults(search.results);
			}
		}
	}, [cities.search]);
	return (
		<Flex mt={'30px'} w={'500px'} bgColor={'white'} rounded='md' flexDir={'column'}>
			<InputGroup rounded={'xl'}>
				<Input
					placeholder='Search'
					size='lg'
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<InputRightElement mt={'4px'} cursor={'pointer'} onClick={handleSearch}>
					{isSearching ? <Spinner boxSize={'1.5em'} /> : <BiSearch size={'1.5em'} />}
				</InputRightElement>
			</InputGroup>
			<Flex flexDir={'column'}>
				{input.length > 0 &&
					searchResults.map((city, index) => (
						<Link key={index} href={`/cities/name=${city.name}&id=${city._id}`}>
							<Flex
								cursor={'pointer'}
								w={'100%'}
								p={'10px'}
								_hover={{
									bgColor: 'blue.700',
									color: 'white',
								}}>
								<Text px={'20px'} fontSize={'20px'}>
									{city.name}
								</Text>
							</Flex>
						</Link>
					))}
			</Flex>
		</Flex>
	);
};

export default CityResults;
