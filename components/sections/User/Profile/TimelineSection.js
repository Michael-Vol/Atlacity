import React, { useEffect, useState } from 'react';
import { Flex, Text, Heading, Grid, Stack, Skeleton } from '@chakra-ui/react';
import LoadingSkeleton from '../../Home/LoadingSkeleton';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { HiOutlineEmojiSad } from 'react-icons/hi';

import FeedItem from '../../Home/FeedItem';
import { getTimeline } from '../../../../actions/timeline/timeline';
const TimelineSection = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const auth = useSelector((state) => state.auth);
	const { profile } = useSelector((state) => state.profile);
	const { timeline } = useSelector((state) => state.timeline);
	const [timelineRequested, setTimelineRequested] = useState(false);

	useEffect(() => {
		if (router.query.userId && !timelineRequested) {
			dispatch(getTimeline(router.query.userId));
		}
	}, [router]);

	return (
		<Flex flexDir={'column'} mt={'40px'} p={'30px'} color={'blue.500'}>
			{!timeline.isLoading ? (
				timeline.feedItems && timeline.feedItems.length > 0 ? (
					<div>
						{timeline.feedItems.map((feedItem, index) => (
							<FeedItem key={index} feedItem={feedItem} />
						))}
					</div>
				) : (
					profile.profile && (
						<Flex
							flexDir={'column'}
							justifyContent={'center'}
							alignItems={'center'}
							mt={'20px'}
							fontSize={'28px'}>
							<HiOutlineEmojiSad size={'1.5em'} />
							<Text color={'blue.800'} mt={'10px'}>
								{profile.profile.user.firstName} has no activity yet.
							</Text>
						</Flex>
					)
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

export default TimelineSection;
