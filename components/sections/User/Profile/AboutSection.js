import React from 'react';
import { Flex, Text, Heading, Grid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { MdPlace } from 'react-icons/md';
import CityItem from '../../../ui/CityItem';
import PlaceItem from '../../../ui/PlaceItem';
import { BsFillDoorOpenFill, BsCalendarDate } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const AboutSection = () => {
	const auth = useSelector((state) => state.auth);
	const { profile, avatar } = useSelector((state) => state.profile);
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
						<Flex mt={'20px'} alignItems={'center'}>
							<AiOutlineInfoCircle />
							<Text ml={'10px'} maxW={'50%'} maxH={'200px'} overflow={'scroll'}>
								{profile.profile.about}
							</Text>
						</Flex>
					</Flex>

					<Flex mt={'20px'} flexDir={'column'}>
						<Heading fontSize={'22px'} fontWeight={'500'}>
							Favourite Places
						</Heading>
						{profile.profile.favouritePlaces ? (
							<Grid overflow={'scroll'} mt={'20px'} templateColumns='repeat(5, 1fr)' p={'10px'}>
								{profile.profile.favouritePlaces.map((place, index) => {
									if (place) {
										return <PlaceItem place={place} key={index} />;
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
						<Grid overflow={'scroll'} mt={'20px'} templateColumns='repeat(5, 1fr)' p={'10px'}>
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
