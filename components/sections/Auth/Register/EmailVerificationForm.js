import React, { useState } from 'react';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Textarea,
	PinInput,
	PinInputField,
	HStack,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import Button from '../../../ui/Button';

const EmailVerificationForm = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		code: '',
	});

	const handleValidation = () => {
		const errors = {};
		if (formData.code.length < 6) {
			errors.code = 'Please enter a valid code';
		}
		return errors;
	};

	return (
		<Flex flexDir={'column'} alignItems={'center'}>
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
						<Field name='code'>
							{({ field, form }) => (
								<FormControl mt={'20px'} isInvalid={form.errors.code && form.touched.code}>
									<FormLabel htmlFor='code'>Verification Code</FormLabel>
									<HStack>
										<PinInput
											{...field}
											type='numeric'
											autoFocus
											otp
											onChange={(value) => {
												setFormData({ code: value });
											}}>
											<PinInputField />
											<PinInputField />
											<PinInputField />
											<PinInputField />
											<PinInputField />
											<PinInputField />
										</PinInput>
									</HStack>
									<FormErrorMessage>{form.errors.code}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Box mt={'40px'} mb={'20px'} textAlign={'center'}>
							<Button
								bg='blue.400'
								color={'white'}
								size='lg'
								// isLoading={props.isSubmitting}
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

export default EmailVerificationForm;
