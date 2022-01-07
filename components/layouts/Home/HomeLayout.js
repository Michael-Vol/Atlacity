import React, { useEffect, useState, useRef } from 'react';
import { Flex, Text, Avatar, Input, Heading, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { MdPlace } from 'react-icons/md';
import { BiPencil } from 'react-icons/bi';
import AddVisitModal from '../../sections/Home/AddVisitModal';

const HomeLayout = () => {
	const auth = useSelector((state) => state.auth);
	const { profile, avatar } = useSelector((state) => state.profile);
	const [avatarFile, setAvatarFile] = useState();

	const initialFocusRef = useRef();
	const finalFocusRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (!avatar.isLoading && !avatarFile) {
			if (avatar.avatar) {
				setAvatarFile(Buffer.from(avatar.avatar.buffer.data).toString('base64'));
			}
		}
	}, []);
	const handleAddVisit = (values) => {
		console.log(values);
	};

	return (
		<Grid templateColumns={'repeat(20,1fr)'} h={'100vh'}>
			<GridItem colSpan={3}></GridItem>
			<GridItem colSpan={14}>
				<Flex color={'blue.700'} py={'30px'} px={'60px'} flexDir={'column'}>
					<Heading fontSize={'28px'} fontWeight={'500'}>
						Welcome back, {auth.user.firstName}
					</Heading>
					<Flex mt={'20px'} bg={'#fff'} p={'20px'} rounded={'md'} flexDir={'column'}>
						<Flex alignItems={'center'} w={'100%'}>
							<Avatar
								cursor={'pointer'}
								mr={'10px'}
								boxSize={'40px'}
								src={avatarFile && `data:image/png;base64,${avatarFile}`}
								name={`${auth.user.firstName} ${auth.user.lastName}`}
							/>
							<Button
								bgColor={'white'}
								_hover={{ bgColor: 'gray.200' }}
								color={'blue.700'}
								rounded={'2xl'}
								w={'100%'}
								ml={'10px'}
								textAlign={'left'}
								onClick={onOpen}>
								<Flex textAlign={'left'}>Add your latest visit</Flex>
								<AddVisitModal
									initialFocusRef={initialFocusRef}
									finalFocusRef={finalFocusRef}
									isOpen={isOpen}
									onClose={onClose}
									onSubmit={handleAddVisit}
								/>
							</Button>
						</Flex>
						<Flex
							fontWeight={'500'}
							mt={'20px'}
							justifyContent={'space-around'}
							alignContent={'center'}>
							<Button
								bgColor={'#fff'}
								_hover={{ bgColor: 'gray.200' }}
								color={'blue.700'}
								w={'100%'}
								mx={'20px'}>
								<Flex fontSize={'18px'}>
									<MdPlace />
									<Text ml={'10px'}>New Place</Text>
								</Flex>
							</Button>
							<Button
								bgColor={'#fff'}
								_hover={{ bgColor: 'gray.200' }}
								color={'blue.700'}
								w={'100%'}
								mx={'20px'}>
								<Flex fontSize={'18px'}>
									<BiPencil />

									<Text ml={'10px'}>New Blog Post</Text>
								</Flex>
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</GridItem>
			<GridItem colSpan={3}></GridItem>
		</Grid>
	);
};

export default HomeLayout;
