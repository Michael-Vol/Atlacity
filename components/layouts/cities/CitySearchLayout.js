import React, { useEffect, useState } from 'react';
import { Text, Heading, Flex, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import { FiTrendingUp } from 'react-icons/fi';

import checkAuth from '../../../lib/checkAuthClient';
import { getPopularCities } from '../../../actions/cities/city';
import Link from 'next/link';

const CitySearchLayout = () => {
	const cities = useSelector((state) => state.cities);
	const dispatch = useDispatch();

	const [popularCitiesFetched, setPopularCitiesFetched] = useState(false);

	useEffect(() => {
		dispatch(getPopularCities());
	}, []);

	useEffect(() => {
		const { popular, search } = cities;
		if (!popular.isLoading) {
			if (popular.error) {
				return console.log(popular.error);
			} else if (popular.results.length > 0) {
				console.log(popular.results);
				setPopularCitiesFetched(true);
			}
		}
	}, [cities]);

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
						<Flex ml={'10px'}>
							{popularCitiesFetched &&
								cities.popular.results.map((city) => (
									<Link href={`/cities/name=${city.name}&id=${city._id}`}>
										<Text
											_hover={{
												textDecoration: 'underline',
											}}
											cursor={'pointer'}
											color={'#fff'}
											fontSize={'20px'}
											fontWeight={'700'}
											mx={'10px'}>
											{city.name}
										</Text>
									</Link>
								))}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default checkAuth(CitySearchLayout);
