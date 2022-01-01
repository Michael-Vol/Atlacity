import React, { useState, useEffect } from 'react';
import {
	Flex,
	Text,
	Heading,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Box,
	useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../ui/Button';
import checkAuth from '../../../../lib/checkAuthClient';
import { updatePassword } from '../../../../actions/auth/updatePassword';

const ChangePassword = () => {
	const auth = useSelector((state) => state.auth);
	const [dispatched, setDispatched] = useState(false);
	const dispatch = useDispatch();
	const toast = useToast();

	const initialData = {
		oldPassword: '',
		newPassword: '',
		verifyPassword: '',
	};
	const [formData, setFormData] = useState(initialData);

	const handleSubmit = () => {
		console.log(formData);
		dispatch(
			updatePassword({
				oldPassword: formData.oldPassword,
				newPassword: formData.newPassword,
			})
		);
		setDispatched(true);
	};

	useEffect(() => {
		if (!auth.isLoading && dispatched) {
			setDispatched(false);
			if (auth.passwordUpdated === true) {
				if (!toast.isActive('success-toast') && !toast.isActive('error-toast')) {
					toast({
						id: 'success-toast',
						title: 'Success',
						description: auth.message,
						status: 'success',
						duration: 4000,
						isClosable: true,
					});
				}
			} else if (auth.passwordUpdated === false) {
				if (!toast.isActive('success-toast') && !toast.isActive('error-toast')) {
					toast({
						id: 'error-toast',
						title: 'Error',
						description: auth.message,
						status: 'error',
						duration: 4000,
						isClosable: true,
					});
				}
			}
		}
	}, [auth]);

	const handleValidation = () => {
		const errors = {};
		if (!formData.oldPassword) {
			errors.oldPassword = 'Required';
		}
		if (!formData.newPassword) {
			errors.newPassword = 'Required';
		}
		if (!formData.verifyPassword) {
			errors.verifyPassword = 'Required';
		}
		if (formData.newPassword !== formData.verifyPassword) {
			errors.verifyPassword = 'Password does not match';
		}
		return errors;
	};

	return (
		<Flex flexDir={'column'} color={'blue.500'}>
			<Heading fontSize={'36px'} fontWeight={'500'} mb={'40px'}>
				Change Your Password
			</Heading>

			<Formik
				initialValues={formData}
				validate={handleValidation}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					handleSubmit();
				}}>
				{(props) => (
					<Form
						onKeyDown={(keyEvent) => {
							if (keyEvent.key === 'Enter') {
								keyEvent.preventDefault();
							}
						}}>
						<Flex flexDir={'column'}>
							<Field name='oldPassword'>
								{({ field, form }) => (
									<FormControl
										isInvalid={form.errors.oldPassword && form.touched.oldPassword}>
										<FormLabel htmlFor='oldPassword'>Old Password</FormLabel>
										<Input
											{...field}
											type='password'
											variant={'filled'}
											value={formData.oldPassword}
											onChange={(e) =>
												setFormData({ ...formData, oldPassword: e.target.value })
											}
											id='oldPassword'
											placeholder=' Insert your old password'
										/>
										<FormErrorMessage>{form.errors.oldPassword}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Flex gridGap={10} marginY={'30px'}>
								<Field name='newPassword'>
									{({ field, form }) => (
										<FormControl
											isInvalid={form.errors.newPassword && form.touched.newPassword}>
											<FormLabel htmlFor='newPassword'>New Password</FormLabel>
											<Input
												{...field}
												variant={'filled'}
												value={formData.newPassword}
												onChange={(e) =>
													setFormData({ ...formData, newPassword: e.target.value })
												}
												type='password'
												id='newPassword'
												placeholder=' Insert your current password'
											/>
											<FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								<Field name='verifyPassword'>
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.verifyPassword && form.touched.verifyPassword
											}>
											<FormLabel htmlFor='verifyPassword'>Verify Password</FormLabel>
											<Input
												{...field}
												variant={'filled'}
												value={formData.verifyPassword}
												onChange={(e) =>
													setFormData({
														...formData,
														verifyPassword: e.target.value,
													})
												}
												type='password'
												id='verifyPassword'
												placeholder='Type again your new password'
											/>
											<FormErrorMessage>{form.errors.verifyPassword}</FormErrorMessage>
										</FormControl>
									)}
								</Field>
							</Flex>
						</Flex>

						<Box mt={'40px'} textAlign={'end'} mb={'20px'}>
							<Button
								// color={'white'}
								size='lg'
								mr={'20px'}
								variant={'outline'}
								color={'blue.400'}
								bg={'white'}
								_hover={{ bg: 'gray.100' }}
								onClick={() => setFormData(initialData)}>
								Clear
							</Button>
							<Button
								bg='blue.400'
								color={'white'}
								size='lg'
								isLoading={auth.isLoading}
								// isDisabled={!props.dirty || !props.isValid || props.isValidating}
								type='submit'>
								Save
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</Flex>
	);
};

export default checkAuth(ChangePassword);
