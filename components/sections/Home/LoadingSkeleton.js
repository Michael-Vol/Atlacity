import React from 'react';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const LoadingSkeleton = () => {
	return (
		<Box padding='15px' boxShadow='lg' bg='#fff' rounded={'md'} my={'5px'}>
			<SkeletonCircle size='10' />
			<SkeletonText mt='4' noOfLines={3} spacing='4' />
		</Box>
	);
};

export default LoadingSkeleton;
