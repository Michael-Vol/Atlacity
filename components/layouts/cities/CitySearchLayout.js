import React from 'react';
import { Text, Heading, Flex, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import checkAuth from '../../../lib/checkAuthClient';
import { BiSearch } from 'react-icons/bi';
import { FiTrendingUp } from 'react-icons/fi';

const CitySearchLayout = () => {
	return (
		<Flex flexDir={'column'}>
			<Flex flexDir={'column'} h={'92vh'} alignItems={'center'}>
				<Flex flexDir={'column'} mt={'12%'} textAlign={'center'}>
					<Heading fontSize={'48px'} color={'white'}>
						Atlacity Cities
					</Heading>
					<InputGroup mt={'30px'} w={'500px'} bgColor={'white'} rounded={'xl'}>
						<Input placeholder='Search' size='lg' />
						<InputRightElement mt={'4px'}>
							<BiSearch size={'1.5em'} />
						</InputRightElement>
					</InputGroup>
					<Flex color={'white'} alignItems={'center'} mt={'10px'}>
						<FiTrendingUp size={'1.5em'} />
						<Text ml={'10px'} fontSize={'22px'} fontWeight={'500'}>
							Trending
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default checkAuth(CitySearchLayout);
