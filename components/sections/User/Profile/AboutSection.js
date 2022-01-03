import React from 'react';
import { Flex, Text, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { MdPlace } from 'react-icons/md';

const AboutSection = () => {
	const auth = useSelector((state) => state.auth);

	return (
		<Flex flexDir={'column'} mt={'40px'} p={'30px'}>
			<Heading fontSize={'28px'} color={'blue.500'} fontWeight={'400'}>
				<Flex alignItems={'center'}>
					<MdPlace />
					<Text ml={'10px'} fontSize={'20px'}></Text>
				</Flex>
			</Heading>
		</Flex>
	);
};

export default AboutSection;
