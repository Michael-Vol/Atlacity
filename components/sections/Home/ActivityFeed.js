import React, { useEffect, useState } from 'react';
import { Flex, Text, Stack, Skeleton } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';

import FeedItem from './FeedItem';
import LoadingSkeleton from './LoadingSkeleton';
import { getActivityFeed } from '../.../../../../actions/activityFeed/activityFeed';

const ActivityFeed = () => {
	const dispatch = useDispatch();
	const { feed } = useSelector((state) => state.activityFeed);

	useEffect(() => {
		dispatch(getActivityFeed());
	}, []);

	return (
		<Flex flexDir={'column'} mx={'60px'} py={'20px'}>
			{!feed.isLoading ? (
				feed.feedItems &&
				feed.feedItems.length > 0 && (
					<div>
						{feed.feedItems.map((feedItem, index) => (
							<FeedItem key={index} feedItem={feedItem} />
						))}
					</div>
				)
			) : (
				<Flex flexDir={'column'}>
					<LoadingSkeleton />
					<LoadingSkeleton />
					<LoadingSkeleton />
					<LoadingSkeleton />
				</Flex>
			)}
		</Flex>
	);
};

export default ActivityFeed;
