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
				console.log(search);
				setSearchResults(search.results);
			}
		}
	}, [places.search]);

	return (
		<div>
			<Flex
				w={'250px'}
				bgColor={'white'}
				rounded='md'
				flexDir={'column'}
				mr={'20px'}
				alignItems={'center'}
				position={'relative'}>
				<InputGroup rounded={'xl'}>
					<Input placeholder='Search' value={input} onChange={(e) => setInput(e.target.value)} />
					<InputRightAddon cursor={'pointer'} onClick={handleSearch}>
						{isSearching ? <Spinner boxSize={'1.5em'} /> : <BiSearch size={'1.5em'} />}
					</InputRightAddon>
				</InputGroup>
			</Flex>
			<Flex
				flexDir={'column'}
				position={'absolute'}
				zIndex={'10'}
				bgColor={'blue.800'}
				color={'white'}
				border={input.length > 3 && searchResults && '1px solid'}
				borderColor={'gray.800'}
				borderRadius={'0px 0px 5px 5px'}>
				{input.length > 0 &&
					searchResults.map((place, index) => (
						<Link key={index} href={`/places/${place._id}`}>
							<Flex
								cursor={'pointer'}
								w={'250px'}
								p={'10px'}
								_hover={{
									bgColor: 'gray.800',
									color: 'white',
								}}>
								<Text px={'5px'}>{place.name}</Text>
							</Flex>
						</Link>
					))}
			</Flex>
		</div>
	);
};

export default PlaceResults;
