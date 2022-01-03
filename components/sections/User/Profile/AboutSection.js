import React from 'react';
import { Flex, Text, Heading, Grid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { MdPlace } from 'react-icons/md';
import CityItem from '../../../ui/CityItem';
import { BsFillDoorOpenFill, BsCalendarDate } from 'react-icons/bs';
const AboutSection = () => {
	const auth = useSelector((state) => state.auth);
	const profile = useSelector((state) => state.profile);
	return (
		<div>
			{profile.profile && (
				<Flex flexDir={'column'} mt={'40px'} p={'30px'} color={'blue.500'}>
					<Flex flexDir={'column'} fontSize={'18px'} fontWeight={'400'}>
						<Flex alignItems={'center'}>
							<MdPlace />
							<Text ml={'10px'}> {profile.profile.currentLocation.name}</Text>
						</Flex>
						<Flex mt={'20px'} alignItems={'center'}>
							<BsFillDoorOpenFill />
							<Text ml={'10px'}> {profile.profile.visits.length} Visits</Text>
						</Flex>
						<Flex mt={'20px'} alignItems={'center'}>
							<BsCalendarDate />
							<Text ml={'10px'}>
								Joined Atlacity on {new Date(auth.user.createdAt).toLocaleDateString()}
							</Text>
						</Flex>
					</Flex>

					<Flex mt={'40px'} flexDir={'column'}>
						<Heading fontSize={'22px'} fontWeight={'500'}>
							About {auth.user.firstName}
						</Heading>
						<Text p={'15px'} mt={'10px'} fontSize={'20px'} color={'gray.800'}>
							{profile.profile.about}
						</Text>
					</Flex>

					<Flex mt={'20px'} flexDir={'column'}>
						<Heading fontSize={'22px'} fontWeight={'500'}>
							Favourite Places
						</Heading>
						{profile.profile.favouritePlaces.length > 0 ? (
							<Grid
								overflow={'scroll'}
								mt={'20px'}
								templateColumns='repeat(4, 1fr)'
								gap={2}
								p={'20px'}>
								{profile.profile.favouritePlaces.map((city, index) => {
									if (city) {
										return <CityItem city={city} key={index} />;
									}
								})}
							</Grid>
						) : (
							<Text fontSize={'20px'} p={'15px'}>
								No favourite places added yet
							</Text>
						)}
					</Flex>
					<Flex mt={'20px'} flexDir={'column'}>
						<Heading fontSize={'22px'} fontWeight={'500'}>
							Favourite Cities
						</Heading>
						<Grid
							overflow={'scroll'}
							mt={'20px'}
							templateColumns='repeat(4, 1fr)'
							gap={2}
							p={'20px'}>
							{profile.profile.favouriteCities.map((city, index) => {
								if (city) {
									return <CityItem city={city} key={index} />;
								}
							})}
						</Grid>
					</Flex>
				</Flex>
			)}
		</div>
	);
};

export default AboutSection;
