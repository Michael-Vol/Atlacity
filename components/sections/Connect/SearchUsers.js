import React, { useState, useEffect } from 'react';
import { InputGroup, Input, InputRightAddon, Flex, Text, Spinner } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { searchUsers } from '../../../actions/users/users';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { MdOutlineClear } from 'react-icons/md';
import SearchResult from './SearchResult';
import { useRouter } from 'next/router';

const SearchUsers = ({ onSelect }) => {
	const router = useRouter();
	const [input, setInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [userSelected, setUserSelected] = useState(false);
	const dispatch = useDispatch();
	const { search } = useSelector((state) => state.users);
	useEffect(() => {
		handleSearch();
		if (input.length <= 2) {
			setSearchResults([]);
			setIsSearching(false);
		}
	}, [input]);

	const handleSearch = () => {
		if (input.length > 2 && !userSelected) {
			setIsSearching(true);
			return dispatch(searchUsers(input));
		}
		setSearchResults([]);
	};
	const handleUserSelect = (user) => {
		setInput(`${user.firstName} ${user.lastName}`);
		setUserSelected(true);
		setSearchResults([]);
		router.push(`/users/${user._id}/profile`);
	};

	const resetSearch = () => {
		setInput('');
		setSearchResults([]);
		setIsSearching(false);
		setUserSelected(false);
	};

	useEffect(() => {
		if (!search.isLoading) {
			if (search.error) {
				setIsSearching(false);
				return console.log(search.error);
			} else {
				setIsSearching(false);
				setSearchResults(search.results);
			}
		}
	}, [search]);

	return (
		<div>
			<Flex
				w={'100%'}
				bgColor={'white'}
				rounded='md'
				flexDir={'column'}
				mr={'20px'}
				alignItems={'center'}
				position={'relative'}>
				<InputGroup rounded={'xl'}>
					<Input
						placeholder='Search Users'
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<InputRightAddon cursor={'pointer'} onClick={handleSearch}>
						{userSelected ? (
							<MdOutlineClear onClick={resetSearch} size={'1.5em'} />
						) : isSearching ? (
							<Spinner boxSize={'1.5em'} />
						) : (
							<BiSearch size={'1.5em'} />
						)}
					</InputRightAddon>
				</InputGroup>
			</Flex>
			<Flex
				flexDir={'column'}
				color={'blue.800'}
				border={input.length > 3 && !userSelected && '1px solid'}
				borderColor={'gray.800'}
				borderRadius={'0px 0px 5px 5px'}>
				{input.length > 0 &&
					searchResults.map((user) => (
						<SearchResult key={user._id} user={user} onUserSelect={handleUserSelect} />
					))}
			</Flex>
		</div>
	);
};

export default SearchUsers;
