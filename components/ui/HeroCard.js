import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';

const HeroCard = (props) => {
	const { text, imageName } = props;
	return (
		<Box
			_hover={{
				boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;',
			}}
			transition={'all .3s ease-in-out'}
			boxShadow='xl'
			bg='gray.50'
			rounded='xl'
			p='5px'
			w='full'
			maxW='250px'
			py='20px'>
			<Flex alignItems='center'>
				<Image src={`/vectors/${imageName}.png`} height='64px' width='64px' layout='intrinsic' />
				<Text ml='20px' my='auto'>
					{text}
				</Text>
			</Flex>
		</Box>
	);
};

export default HeroCard;
