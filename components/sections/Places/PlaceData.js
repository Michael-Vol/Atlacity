import React, { useState } from 'react';
import { Flex, Text, Tabs, TabList, Tab } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import PlaceVisits from './PlaceVisits';

const PlaceData = ({ place }) => {
	const [activeTab, setActiveTab] = useState('visits');

	const renderactiveTab = () => {
		switch (activeTab) {
			case 'visits':
				return <PlaceVisits placeId={place._id} />;
			default:
				return <PlaceVisits placeId={place._id} />;
		}
	};
	return (
		<Flex flexDir={'column'}>
			<Flex h={'7vh'} color={'blue.800'}>
				<Tabs colorScheme={'blue'} size={'lg'} w={'100%'} variant={'enclosed'}>
					<TabList>
						<Tab onClick={() => setActiveTab('visits')}> Visits</Tab>
						<Tab onClick={() => setActiveTab('faq')}> FAQ</Tab>
					</TabList>
				</Tabs>
			</Flex>
			{renderactiveTab()}
		</Flex>
	);
};

export default PlaceData;
