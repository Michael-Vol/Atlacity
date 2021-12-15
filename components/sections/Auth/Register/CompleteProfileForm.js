import React, { useRef } from 'react';
import {
	Flex,
	Center,
	Box,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	FormHelperText,
	Select,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

import Button from '../../../ui/Button';
import FileUploader from '../../../ui/FileUploader';
import PlacesAutocomplete from '../../../ui/PlacesAutocomplete';
const CompleteProfileForm = ({ onSubmit }) => {
	const formRef = useRef();
	const onFileAccepted = (file) => {};
	const handleValidation = (values) => {
		const errors = {};

		return errors;
	};

	const selectCurrentLocation = (place) => {
		console.log(place, formRef.current.values);
		formRef.current.values.currentLocation = place;
	};
	const addFavouriteCity = (place) => {
		formRef.current.values.favouriteCities.push(place);
	};
	return (
		<Flex flexDir={'column'} mr={'50px'} h={'90%'}>
			<Formik
				innerRef={formRef}
				initialValues={{
					about: '',
					photo: null,
					currentLocation: {},
					favouriteCities: [],
				}}
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
									<PlacesAutocomplete
										id='locationAutocomplete'
										onSelectedPlace={selectCurrentLocation}
									/>
									<FormErrorMessage>{form.errors.location}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name='favouriteCities'>
							{({ field, form }) => (
								<FormControl mt={'20px'}>
									<FormLabel htmlFor='favouriteCities'>Favourite Cities</FormLabel>
									<PlacesAutocomplete
										id='favouriteCityAutocomplete'
										onSelectedPlace={addFavouriteCity}
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
								isDisabled={!props.dirty || !props.isValid || props.isValidating}
								type='submit'>
								Register
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</Flex>
	);
};

export default CompleteProfileForm;
