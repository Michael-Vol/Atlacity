import React from 'react';
import { useSelector } from 'react-redux';
import { Flex, Box, FormControl, FormLabel, FormErrorMessage, Input, FormHelperText } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

import Button from '../../../ui/Button';

const LoginForm = ({ onSubmit }) => {
	const auth = useSelector((state) => state.auth);
	const handleValidation = (values) => {
		const errors = {};

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
		return errors;
	};
	return (
		<Flex flexDir={'column'} mr={'50px'} h={'90%'}>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validate={handleValidation}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					onSubmit(values, setSubmitting);
				}}>
				{(props) => (
					<Form>
						<Field name='email'>
							{({ field, form }) => (
								<FormControl isInvalid={form.errors.email && form.touched.email} mt={'20px'}>
									<FormLabel htmlFor='email'>Email</FormLabel>
									<Input {...field} type='text' id='email' placeholder='Email Address' />
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
						<Box mt={'40px'} textAlign={'end'} mb={'20px'}>
							<Button
								bg='blue.400'
								color={'white'}
								size='lg'
								isLoading={props.isSubmitting || auth.isLoading}
								isDisabled={!props.dirty || !props.isValid || props.isValidating}
								type='submit'>
								Sign In
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</Flex>
	);
};

export default LoginForm;
