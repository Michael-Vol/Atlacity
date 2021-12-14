import React from 'react';
import {
	Flex,
	Center,
	Box,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	FormHelperText,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

import Button from '../../../ui/Button';
import FileUploader from '../../../ui/FileUploader';
const CompleteProfileForm = () => {
	const onFileAccepted = (file) => {};
	const handleValidation = (values) => {
		const errors = {};
		if (!values.firstName) {
			errors.firstName = 'Required';
		}
		if (!values.lastName) {
			errors.lastName = 'Required';
		}
		if (!values.email) {
			errors.email = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
			errors.email = 'Invalid email address';
		}
		if (!values.password) {
			errors.password = 'Required';
		} else if (values.password.length < 7) {
			errors.password = 'Password must be at least 7 characters';
		}
		if (!values.dateOfBirth) {
			errors.dateOfBirth = 'Required';
		}
		return errors;
	};

	return (
		<Flex flexDir={'column'} mr={'50px'} h={'90%'}>
			<Formik
				initialValues={{
					about: '',
					photo: null,
					currentLocation: '',
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
						<Field name='email'>
							{({ field, form }) => (
								<FormControl isInvalid={form.errors.email && form.touched.email} mt={'20px'}>
									<FormLabel htmlFor='email'>Email</FormLabel>
									<Input {...field} type='text' id='email' placeholder='Email Address' />
									<FormHelperText>We'll never share your email.</FormHelperText>
									<FormErrorMessage>{form.errors.email}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name='password'>
							{({ field, form }) => (
								<FormControl
									isInvalid={form.errors.password && form.touched.password}
									mt={'20px'}>
									<FormLabel htmlFor='password'>Password</FormLabel>
									<Input {...field} type='password' id='password' placeholder='Password' />
									{!form.values.password && (
										<FormHelperText>
											Choose a password with at least 7 characters.
										</FormHelperText>
									)}
									<FormErrorMessage>{form.errors.password}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name='dateOfBirth'>
							{({ field, form }) => (
								<FormControl
									isInvalid={form.errors.dateOfBirth && form.touched.dateOfBirth}
									mt={'20px'}>
									<FormLabel htmlFor='dateOfBirth'>Date Of Birth</FormLabel>
									<Input {...field} type='date' id='dateOfBirth' />
									<FormErrorMessage>{form.errors.dateOfBirth}</FormErrorMessage>
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
