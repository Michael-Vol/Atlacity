import React, { useState } from 'react';
import { Flex, Image, Box, keyframes } from '@chakra-ui/react';
import { BiPencil } from 'react-icons/bi';

const BackgroundPicker = () => {
	const [showEditBackground, setShowEditBackground] = useState(false);
	const defaultImageIds = [
		'1532292060982-8bfb986808e7',
		'1518199117568-a0fc6494fedf',
		'1496309732348-3627f3f040ee',
		'1608501078713-8e445a709b39',
		'1477959858617-67f85cf4f1df',
	];
	const fadeIn = keyframes`
        0% {opacity:0;}
        100% {opacity:1;}
      `;

	return (
		<Flex
			_hover={{ fontWeight: '800', color: 'blue.500' }}
			transition={'0.2s all ease-in-out'}
			alignItems={'end'}>
			{showEditBackground && (
				<Flex
					mr={'20px'}
					rounded={'xl'}
					bg={'gray.200'}
					maxW={'500px'}
					overflow={'scroll'}
					h={'90px'}
					p={'5px'}
					alignItems={'center'}>
					{defaultImageIds.map((imageId) => (
						<Box
							mx={'5px'}
							key={imageId}
							animation={`${fadeIn} 0.2s ease-in-out`}
							transition={'0.2s all ease-in-out'}
							_hover={{
								transform: 'translateY(-3px)',
							}}>
							{' '}
							<Image
								rounded={'xl'}
								src={`https://images.unsplash.com/photo-${imageId}`}
								h={'70px'}
								w={'100px'}
							/>
						</Box>
					))}
				</Flex>
			)}
			<BiPencil onClick={() => setShowEditBackground(!showEditBackground)} size={'2em'} />
		</Flex>
	);
};

export default BackgroundPicker;
