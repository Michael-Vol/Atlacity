import React from 'react';
import { Flex, Text, Avatar } from '@chakra-ui/react';
import AddPlaceItem from './AddPlaceItem';
import AddVisitItem from './AddVisitItem';
import PinnedPlaceItem from './PinnedPlaceItem';

const FeedItem = ({ feedItem }) => {
	const { itemCreator, item, itemType } = feedItem;

	const renderItem = () => {
		switch (itemType) {
			case 'add-place':
				return <AddPlaceItem feedItem={feedItem} />;
			case 'add-visit':
				return <AddVisitItem feedItem={feedItem} />;
			case 'pinned-place':
				return <PinnedPlaceItem feedItem={feedItem} />;
			default:
				return <AddPlaceItem feedItem={feedItem} />;
		}
	};

	return (
		<Flex my={'30px'} h={'100%'} flexDir={'column'} bgColor={'#fff'} rounded={'xl'} p={'20px'}>
			{renderItem()}
		</Flex>
	);
};

export default FeedItem;
