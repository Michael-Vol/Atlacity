import React from 'react';
import { Flex, Text, Image, GridItem } from '@chakra-ui/react';
import Button from '../../ui/Button';
import { useSelector, useDispatch } from 'react-redux';

const ConnectItem = () => {
	return (
		<GridItem>
			<Flex flexDir={'column'} bgColor={'#fff'} rounded={'xl'} w={'200px'}>
				<Image src={'https://i.pravatar.cc/200?img=58'} height={'100%'} width={'100%'} />
				<Flex flexDir={'column'} mt={'5px'} p={'10px'}>
					<Text fontSize={'20px'} fontWeight={'500'}>
						John Doe
					</Text>
					<Button m={'5px'} bgColor={'blue.600'}>
						Follow
					</Button>
					<Button m={'5px'} bgColor={'white'} _hover={{ bgColor: 'gray.100' }} color={'blue.800'}>
						Remove
					</Button>
				</Flex>
			</Flex>
		</GridItem>
	);
};

export default ConnectItem;
