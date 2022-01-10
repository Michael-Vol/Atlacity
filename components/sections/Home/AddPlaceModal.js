import React, { useEffect, useState } from 'react';
import {
	Text,
	Flex,
	Modal,
	ModalHeader,
	ModalContent,
	ModalBody,
	ModalFooter,
	ModalOverlay,
	ModalCloseButton,
	FormControl,
	FormLabel,
	FormHelperText,
	FormErrorMessage,
	Textarea,
	Input,
	Checkbox,
} from '@chakra-ui/react';
import Button from '../../ui/Button';
import { Formik, Form, Field } from 'formik';
import CityResults from './CityResults';
import LocationSelector from './LocationSelector';
import axios from 'axios';

const AddPlaceModal = ({ initialFocusRef, finalFocusRef, isOpen, onClose, onSubmit }) => {
	const initialData = {
		name: '',
		coords: {
			lng: NaN,
			lat: NaN,
		},
		city: {},
		address: '',
		description: '',
		category: '',
		telephone: '',
	};
	const [formData, setFormData] = useState(initialData);
	const [cityCoords, setCityCoords] = useState({
		lat: 37.98381,
		lng: 23.727539,
	});
	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	useEffect(() => {
		if (Object.keys(formData.city).length > 0) {
			setCityCoords({
				lat: formData.city.info.lat,
				lng: formData.city.info.lon,
			});
		}
	}, [formData.city]);

	const handleLocationSelect = async ({ coords, address }) => {
		setFormData({ ...formData, coords: { lng: coords[0], lat: coords[1] } });
	};

	const handleValidation = () => {
		const errors = {};
		if (!formData.name) {
			errors.name = 'Please enter a name';
		}
		if (!formData.description) {
			errors.description = 'Please enter a description';
		}
		if (Object.keys(formData.city).length === 0) {
			errors.city = 'Please select a city';
		}
		if (!formData.address) {
			errors.address = 'Please enter a address';
		}
		if (!formData.category) {
			errors.category = 'Please enter a category';
		}
		if (!formData.telephone) {
			errors.telephone = 'Please enter a telephone';
		}

		if (isNaN(formData.coords.lat) || isNaN(formData.coords.lng)) {
			errors.location = 'Please select a location';
		}
		return errors;
	};

	return (
		<Modal
			initialFocusRef={initialFocusRef}
			isOpen={isOpen}
			onClose={onClose}
			finalFocusRef={finalFocusRef}
			size={'2xl'}>
			<ModalOverlay />
			<ModalContent color={'blue.700'}>
				<ModalHeader>Add Place</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<Flex flexDir={'column'} justifyContent={'center'} px={'20px'}>
						<Formik
							validate={handleValidation}
							enableReinitialize
							initialValues={initialData}
							onSubmit={(values, { setSubmitting }) => {
								setSubmitting(true);
								onSubmit(formData);
								// setFormData(initialData);
								onClose();
							}}>
							{(props) => (
								<Form
									onKeyDown={(keyEvent) => {
										if (keyEvent.key === 'Enter') {
											keyEvent.preventDefault();
										}
									}}>
									<Flex flexDir={'column'} w={'100%'}>
										<Field name='name'>
											{({ field, form }) => (
												<FormControl
													isInvalid={form.errors.name && form.touched.name}
													mt={'20px'}>
													<FormLabel htmlFor='name'>Name</FormLabel>
													<Input
														{...field}
														onChange={handleChange}
														value={formData.name}
														id='name'
														placeholder={`Enter the place's name`}
													/>
													<FormErrorMessage>{form.errors.name}</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Flex gap={10}>
											<Field name='category'>
												{({ field, form }) => (
													<FormControl
														isInvalid={
															form.errors.category && form.touched.category
														}
														mt={'20px'}>
														<FormLabel htmlFor='category'>Category</FormLabel>
														<Input
															{...field}
															onChange={handleChange}
															value={formData.category}
															id='category'
															placeholder={`Enter the place's category`}
														/>
														<FormErrorMessage>
															{form.errors.category}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<Field name='telephone'>
												{({ field, form }) => (
													<FormControl
														isInvalid={
															form.errors.telephone && form.touched.telephone
														}
														mt={'20px'}>
														<FormLabel htmlFor='telephone'>
															Telephone number
														</FormLabel>
														<Input
															{...field}
															onChange={handleChange}
															value={formData.telephone}
															id='telephone'
															placeholder={`Enter the place's telephone number`}
														/>
														<FormErrorMessage>
															{form.errors.telephone}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
										</Flex>
										<Flex gap={10}>
											<Field name='city'>
												{({ field, form }) => (
													<FormControl
														isInvalid={form.errors.city && form.touched.city}
														mt={'20px'}>
														<FormLabel htmlFor='city'>City</FormLabel>
														<CityResults
															onSelect={(city) =>
																setFormData({ ...formData, city })
															}
														/>
														<FormErrorMessage>
															{form.errors.city}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<Field name='address'>
												{({ field, form }) => (
													<FormControl
														isInvalid={
															form.errors.address && form.touched.address
														}
														mt={'20px'}>
														<FormLabel htmlFor='address'>Address</FormLabel>
														<Input
															{...field}
															value={formData.address}
															onChange={handleChange}
															id='address'
														/>

														<FormErrorMessage>
															{form.errors.address}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
										</Flex>

										<Field name='location'>
											{({ field, form }) => (
												<FormControl
													isInvalid={form.errors.location && form.touched.location}
													mt={'20px'}>
													<FormLabel htmlFor='location'>Location</FormLabel>
													<FormHelperText>
														Select a place on the map to get the address
													</FormHelperText>
													<LocationSelector
														{...field}
														onSelect={handleLocationSelect}
														cityCoords={cityCoords}
													/>

													<Flex color={'red'} mt={'10px'}>
														{form.errors.location}
													</Flex>
												</FormControl>
											)}
										</Field>
										<Field name='description'>
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.description && form.touched.description
													}
													mt={'20px'}>
													<FormLabel htmlFor='description'>Description</FormLabel>
													<Textarea
														{...field}
														type='text'
														id='description'
														onChange={handleChange}
														value={formData.description}
														placeholder='Describe the place...'
													/>
													<FormErrorMessage>
														{form.errors.description}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>

										<Flex m={'60px 0px 20px 0px'} justifyContent={'flex-end'}>
											<Button
												size='md'
												mr={'20px'}
												variant={'outline'}
												color={'blue.700'}
												bg={'white'}
												_hover={{ bg: 'gray.100' }}
												onClick={() => {
													setFormData(initialData);
													onClose();
												}}>
												Cancel
											</Button>
											<Button
												color={'white'}
												bg={'blue.700'}
												size='md'
												_hover={{ bg: 'blue.700' }}
												type='submit'>
												Add
											</Button>
										</Flex>
									</Flex>
								</Form>
							)}
						</Formik>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default AddPlaceModal;
