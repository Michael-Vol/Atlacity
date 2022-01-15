import React, { useEffect } from 'react';
import { Flex, Text, Heading, Grid, GridItem, Image } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import HomeSidebar from '../../sections/Home/HomeSidebar';
import ConnectItem from '../../sections/Connnect/ConnectItem';

const ConnectLayout = () => {
	return (
		<Flex h={'93vh'}>
			<Grid templateColumns={'repeat(20,1fr)'} gap={2}>
				<GridItem colSpan={3}>
					<HomeSidebar />
				</GridItem>
				<GridItem colSpan={17} p={'20px'} color={'blue.800'} overflow={'scroll'}>
					<Flex>
						<Heading fontSize={'38px'}>Connect</Heading>
					</Flex>
					<Flex flexDir={'column'} mt={'30px'}>
						<Flex flexDir={'column'}>
							<Heading fontSize={'20px'} color={'gray.600'}>
								People in your City
							</Heading>
							<Flex
								overflow={'scroll'}
								css={{
									'&::-webkit-scrollbar': {
										width: '0px',
									},
								}}>
								<Grid templateColumns={'repeat(8,1fr)'} gap={4} mt={'30px'}>
									<ConnectItem />
									<ConnectItem />
									<ConnectItem />
									<ConnectItem />
									<ConnectItem />
									<ConnectItem />
									<ConnectItem />
									<ConnectItem />
								</Grid>
							</Flex>
						</Flex>
						<Flex mt={'30px'} flexDir={'column'}>
							<Heading fontSize={'20px'} color={'gray.600'}>
								People with similar interests
							</Heading>
							<Flex
								overflow={'scroll'}
								css={{
									'&::-webkit-scrollbar': {
										width: '0px',
									},
								}}>
								<Grid templateColumns={'repeat(8,1fr)'} gap={4} mt={'30px'}>
									<ConnectItem />
									<ConnectItem />
									<ConnectItem />
									<ConnectItem />
									<ConnectItem />
									<ConnectItem />
									<ConnectItem />
									<ConnectItem />
								</Grid>
							</Flex>
						</Flex>
					</Flex>
				</GridItem>
			</Grid>
		</Flex>
	);
};

export default ConnectLayout;
