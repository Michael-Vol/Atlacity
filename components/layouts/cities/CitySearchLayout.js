import React, { useEffect, useState } from 'react';
import { Text, Heading, Flex, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import { FiTrendingUp } from 'react-icons/fi';

import checkAuth from '../../../lib/checkAuthClient';
import { getPopularCities } from '../../../actions/cities/city';
import Link from 'next/link';
import CityResults from '../../sections/Cities/Search/CityResults';

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
				setPopularCitiesFetched(true);
			}
		}
	}, [cities]);

	return (
		<Flex flexDir={'column'}>
			<Flex flexDir={'column'} h={'93vh'} alignItems={'center'}>
				<Flex flexDir={'column'} mt={'12%'} textAlign={'center'}>
					<Heading fontSize={'48px'} color={'white'}>
						Atlacity Cities
					</Heading>
					<CityResults />

					<Flex color={'white'} alignItems={'center'} mt={'10px'}>
						<FiTrendingUp size={'1.5em'} />
						<Text ml={'10px'} fontSize={'22px'} fontWeight={'500'}>
							Trending
						</Text>
						<Flex ml={'10px'}>
							{popularCitiesFetched &&
								cities.popular.results.map((city, index) => (
									<Link key={index} href={`/cities/name=${city.name}&id=${city._id}`}>
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
