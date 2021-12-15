import React, { useState } from 'react';
import {
	Flex,
	Center,
	Box,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Badge,
	FormHelperText,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

import Button from '../../../ui/Button';
import FileUploader from '../../../ui/FileUploader';
import PlacesAutocomplete from '../../../ui/PlacesAutocomplete';
const CompleteProfileForm = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		about: '',
		photo: null,
		currentLocation: {},
		favouriteCities: [],
	});
	const onFileAccepted = (file) => {};
	const handleValidation = (values) => {
		const errors = {};
		if (Object.keys(formData.currentLocation) === 0) {
			errors.currentLocation = 'Please select your current location';
		}
		if (formData.favouriteCities.length === 0) {
			errors.favouriteCities = 'Please select at least one favourite city';
		}
		console.log(errors);
		return errors;
	};

	const selectCurrentLocation = (place) => {
		setFormData({
			...formData,
			currentLocation: place,
		});
	};

	return (
		<Flex flexDir={'column'} mr={'50px'} h={'90%'}>
			<Formik
				enableReinitialize
				initialValues={formData}
				validate={handleValidation}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					onSubmit(values);
				}}>
				{(props) => (
					<Form>
						<Flex>
							<Field name='photo'>
								{({ field, form }) => (
									<FormControl>
										<FormLabel htmlFor='photo'>Avatar</FormLabel>
										<Center>
											<FileUploader onFileAccepted={onFileAccepted} />
										</Center>
									</FormControl>
								)}
							</Field>
						</Flex>
						<Field name='location'>
							{({ field, form }) => (
								<FormControl mt={'20px'}>
									<FormLabel htmlFor='location'>Current Location</FormLabel>
									{Object.keys(formData.currentLocation).length > 0 && (
										<Badge mb={2} mr={2} colorScheme={'green'}>
											<span>{formData.currentLocation.properties.city}</span>
										</Badge>
									)}
									<PlacesAutocomplete
										id='locationAutocomplete'
										type='location'
										onSelectedPlace={selectCurrentLocation}
									/>
									<FormHelperText>Select your current location </FormHelperText>
									<FormErrorMessage>{form.errors.location}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name='favouriteCities'>
							{({ field, form }) => (
								<FormControl mt={'20px'}>
									<FormLabel htmlFor='favouriteCities'>Favourite Cities</FormLabel>
									{formData.favouriteCities.map((place, index) => {
										return (
											<Badge key={index} mb={2} mr={2} colorScheme={'red'}>
												<span>
													{place.properties && (
														<span>{place.properties.city} </span>
													)}
												</span>
											</Badge>
										);
									})}
									<PlacesAutocomplete
										id='favouriteCityAutocomplete'
										type='favourites'
										onSelectedPlace={(place) => {
											if (
												!formData.favouriteCities.some(
													(city) => city.fullName == place.fullName
												)
											) {
												setFormData({
													...formData,
													favouriteCities: [...formData.favouriteCities, place],
												});
											}
										}}
										clearSelectedPlace={() => {
											setFormData({
												...formData,
												favouriteCities: formData.favouriteCities.slice(0, -1),
											});
										}}
									/>
									<FormHelperText>Choose your favourite cities </FormHelperText>
									<FormErrorMessage>{form.errors.favouriteCities}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Box mt={'40px'} textAlign={'end'} mb={'20px'}>
							<Button
								bg='blue.400'
								color={'white'}
								size='lg'
								isLoading={props.isSubmitting}
								isDisabled={!props.isValid}
								type='submit'>
								Continue
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</Flex>
	);
};

export default CompleteProfileForm;
