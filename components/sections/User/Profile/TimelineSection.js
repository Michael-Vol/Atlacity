import React from 'react';
import { Flex, Text, Heading, Grid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
const TimelineSection = () => {
	const auth = useSelector((state) => state.auth);
	const profile = useSelector((state) => state.profile);

	return (
		<Flex flexDir={'column'} mt={'40px'} p={'30px'} color={'blue.500'}>
			{profile.profile && <Text fontSize={'22px'}>No Activity yet.</Text>}
		</Flex>
	);
};

export default TimelineSection;
