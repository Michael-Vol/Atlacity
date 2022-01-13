import React, { useState, useEffect } from 'react';
import { GridItem, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
const PlaceItem = ({ place }) => {
	const [photoFile, setPhotoFile] = useState(null);
	useEffect(() => {
		if (place.photos.length > 0) {
			setPhotoFile(place.photos[0].buffer);
		}
	}, []);
	return (
		<Link href={`/places/${place._id}`}>
			<GridItem cursor={'pointer'}>
				<Flex
					bgImage={photoFile && `data:image/png;base64,${photoFile}`}
					bgSize={'200px'}
					bgRepeat={'no-repeat'}
					mb={'10px'}
					w={'200px'}
					h={'133px'}
					color={'white'}
					borderRadius={'6px'}
					alignItems={'center'}
					justifyContent={'center'}
					transition={'all 0.3s ease-in-out'}
					_hover={{
						boxShadow:
							'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
						transform: 'translateY(-5px)',
					}}>
					<Text fontSize={'24px'} fontWeight={'700'} textAlign={'center'}>
						{place.name}
					</Text>
				</Flex>
			</GridItem>
		</Link>
	);
};

export default PlaceItem;
