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

const AddPlaceModal = ({ initialFocusRef, finalFocusRef, isOpen, onClose, onSubmit }) => {
	const initialData = {
		coords: {
			lng: NaN,
			lat: NaN,
		},
		name: '',
		city: {},
		description: '',
		location: {},
	};
	const [formData, setFormData] = useState(initialData);
	const [cityCoords, setCityCoords] = useState({
		lat: 37.98381,
		lng: 23.727539,
	});
	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	useEffect(() => {
		if (Object.keys(formData.city).length > 0) {
			console.log(formData.city.info);
			setCityCoords({
				lat: formData.city.info.lat,
				lng: formData.city.info.lon,
			});
			console.log({
				lat: formData.city.info.lat,
				lng: formData.city.info.lon,
			});
		}
	}, [formData.city]);

	const handleLocationCoord = (coord) => {
		setFormData({ ...formData, coords: { lng: coord[0], lat: coord[1] } });
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
			size={'3xl'}>
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
								// onClose();
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
													<FormErrorMessage>{form.errors.city}</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name='location'>
											{({ field, form }) => (
												<FormControl
													isInvalid={form.errors.location && form.touched.location}
													mt={'20px'}>
													<FormLabel htmlFor='location'>Location</FormLabel>
													<LocationSelector
														onSelect={handleLocationCoord}
														cityCoords={cityCoords}
													/>
													<FormErrorMessage>
														{form.errors.location}
													</FormErrorMessage>
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
