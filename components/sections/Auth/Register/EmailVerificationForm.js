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

const EmailVerificationForm = ({ onSubmit, onSkip }) => {
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
						<Flex justifyContent={'space-around'} mt={'30px'}>
							<Button
								size='lg'
								mr={'20px'}
								variant={'outline'}
								color={'blue.400'}
								bg={'white'}
								_hover={{ bg: 'gray.100' }}
								onClick={onSkip}>
								Skip
							</Button>

							<Button
								bg='blue.400'
								color={'white'}
								size='lg'
								// isLoading={props.isSubmitting}
								isDisabled={!props.isValid || props.isValidating}
								type='submit'>
								Continue
							</Button>
						</Flex>
					</Form>
				)}
			</Formik>
		</Flex>
	);
};

export default EmailVerificationForm;
