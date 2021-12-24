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
	Textarea,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

import Button from '../../../ui/Button';
import FileUploader from '../../../ui/FileUploader';
import PlacesAutocomplete from '../../../ui/PlacesAutocomplete';
const CompleteProfileForm = ({ onSubmit }) => {
	const [avatar, setAvatar] = useState(null);
	const [formData, setFormData] = useState({
		about: '',
		photo: null,
		currentLocation: {},
		favouriteCities: [],
	});
	const onFileAccepted = (file) => {
		console.log(file);
		setFormData({ ...formData, photo: file });
	};
	const handleValidation = (values) => {
		const errors = {};
		if (Object.keys(formData.currentLocation).length === 0) {
			errors.currentLocation = 'Please select your current location';
		}
		if (formData.favouriteCities.length === 0) {
			errors.favouriteCities = 'Please select at least one favourite city';
		}
		if (formData.about.length === 0) {
			errors.about = 'Please enter a brief description of yourself';
		}
		if (formData.about.length > 1000) {
			errors.about = 'Maximum 1000 characters allowed';
		}

		return errors;
	};

	return (
		<Flex flexDir={'column'} mr={'50px'}>
			<Formik
				enableReinitialize
				initialValues={formData}
				validate={handleValidation}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					onSubmit(values);
				}}>
				{(props) => (
					<Form
						onKeyDown={(keyEvent) => {
							if (keyEvent.key === 'Enter') {
								keyEvent.preventDefault();
							}
						}}>
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
								<FormControl
									mt={'20px'}
									isInvalid={form.errors.currentLocation && form.touched.currentLocation}>
									<FormLabel htmlFor='location'>Current Location</FormLabel>
									{Object.keys(formData.currentLocation).length > 0 && (
										<Badge mb={2} mr={2} colorScheme={'green'}>
											<span>{formData.currentLocation.properties.city}</span>
										</Badge>
									)}
									<PlacesAutocomplete
										id='locationAutocomplete'
										type='location'
										onSelectedPlace={(place) => {
											setFormData({
												...formData,
												currentLocation: place,
											});
											form.setTouched({ ...form.touched, currentLocation: true });
										}}
									/>
									<FormHelperText>Select your current location </FormHelperText>
									<FormErrorMessage>{form.errors.currentLocation}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name='favouriteCities'>
							{({ field, form }) => (
								<FormControl
									mt={'20px'}
									isInvalid={form.errors.favouriteCities && form.touched.favouriteCities}>
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
												form.setTouched({ ...form.touched, favouriteCities: true });
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
						<Field name='about'>
							{({ field, form }) => (
								<FormControl mt={'20px'} isInvalid={form.errors.about && form.touched.about}>
									<FormLabel htmlFor='about'>About me</FormLabel>
									<Textarea
										{...field}
										onChange={(e) => setFormData({ ...formData, about: e.target.value })}
									/>
									{!form.values.about && (
										<FormHelperText>
											Write a few words about yourself to help others find common
											interests.
										</FormHelperText>
									)}
									<FormErrorMessage>{form.errors.about}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Box mt={'40px'} textAlign={'end'} mb={'20px'}>
							<Button
								bg='blue.400'
								color={'white'}
								size='lg'
								isLoading={props.isSubmitting}
								isDisabled={!props.isValid || props.isValidating}
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
