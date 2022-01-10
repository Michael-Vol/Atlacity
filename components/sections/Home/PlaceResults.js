import React, { useState, useEffect } from 'react';
import { InputGroup, Input, InputRightAddon, Flex, Text, Spinner } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { searchPlaces } from '../../../actions/places/places';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

const PlaceResults = () => {
	const [input, setInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const dispatch = useDispatch();
	const places = useSelector((state) => state.places);

	useEffect(() => {
		handleSearch();
		if (input.length <= 2) {
			setSearchResults([]);
			setIsSearching(false);
		}
	}, [input]);

	const handleSearch = () => {
		if (input.length > 2) {
			setIsSearching(true);
			return dispatch(searchPlaces(input));
		}
		setSearchResults([]);
	};
	useEffect(() => {
		const { search } = places;
		if (!search.isLoading) {
			if (search.error) {
				setIsSearching(false);
				return console.log(search.error);
			} else {
				setIsSearching(false);
				setSearchResults(search.results);
			}
		}
	}, [places.search]);
	return (
		<Flex w={'250px'} bgColor={'white'} rounded='md' flexDir={'column'} mx={'20px'} alignItems={'center'}>
			<InputGroup rounded={'xl'}>
				<Input placeholder='Search' value={input} onChange={(e) => setInput(e.target.value)} />
				<InputRightAddon cursor={'pointer'} onClick={handleSearch}>
					{isSearching ? <Spinner boxSize={'1.5em'} /> : <BiSearch size={'1.5em'} />}
				</InputRightAddon>
			</InputGroup>
			<Flex flexDir={'column'}>
				{input.length > 0 &&
					searchResults.map((place, index) => (
						<Link key={index} href={`/places/${place._id}`}>
							<Flex
								cursor={'pointer'}
								w={'100%'}
								p={'10px'}
								_hover={{
									bgColor: 'blue.700',
									color: 'white',
								}}>
								<Text px={'20px'} fontSize={'20px'}>
									{place.name}
								</Text>
							</Flex>
						</Link>
					))}
			</Flex>
		</Flex>
	);
};

export default PlaceResults;
