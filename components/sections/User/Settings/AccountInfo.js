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
	Badge,
	useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Button from '../../../ui/Button';
import checkAuth from '../../../../lib/checkAuthClient';

import { updateAccountInfo } from '../../../../actions/auth/updateAccountInfo';

const AccountInfo = () => {
	const auth = useSelector((state) => state.auth);
	const [dispatched, setDispatched] = useState(false);
	const dispatch = useDispatch();
	const toast = useToast();

	const initialData = {
		firstName: auth.user.firstName,
		lastName: auth.user.lastName,
		email: auth.user.email,
		dateOfBirth: new Date(auth.user.dateOfBirth).toLocaleDateString('en-CA'),
	};
	const [formData, setFormData] = useState(initialData);

	const handleSubmit = () => {
		console.log(formData);
		dispatch(updateAccountInfo(formData));
		setDispatched(true);
	};

	useEffect(() => {
		if (!auth.isLoading && dispatched) {
			setDispatched(false);
			if (auth.userUpdated === true) {
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
			} else if (auth.userUpdated === false) {
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
		if (!formData.firstName) {
			errors.firstName = 'Required';
		}
		if (!formData.lastName) {
			errors.lastName = 'Required';
		}
		if (!formData.email) {
			errors.email = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
			errors.email = 'Invalid email address';
		}
		if (!formData.dateOfBirth) {
			errors.dateOfBirth = 'Required';
		}
		return errors;
	};

	return (
		<Flex flexDir={'column'} color={'blue.500'}>
			<Heading fontSize={'36px'} fontWeight={'500'} mb={'40px'}>
				Account Info
			</Heading>

			<Flex my={'20px'}>
				<Text fontSize={'18px'} as='span' mr={'10px'}>
					Email Verification Status:
				</Text>
				{auth.user.emailVerified ? (
					<Badge p={'4px'} rounded={'md'} colorScheme={'teal'}>
						Verified
					</Badge>
				) : (
					<Badge p={'4px'} rounded={'md'} colorScheme={'red'}>
						Not Verified
					</Badge>
				)}
			</Flex>
			{!auth.user.emailVerified && (
				<Text mb={'20px'} color={'orange'}>
					It seems that your email is not yet verified.{' '}
					<Link href='/user/email_verification'>
						<Text as={'span'} color={'blue.500'} cursor={'pointer'}>
							Click here
						</Text>
					</Link>
					{'  '}to verify your Atlacity account.
				</Text>
			)}

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
						<Flex>
							<Field name='firstName'>
								{({ field, form }) => (
									<FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
										<FormLabel htmlFor='firstName'> First Name</FormLabel>
										<Input
											{...field}
											variant={'filled'}
											value={formData.firstName}
											onChange={(e) =>
												setFormData({ ...formData, firstName: e.target.value })
											}
											type='text'
											id='firstName'
											placeholder='First Name'
										/>
										<FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Field name='lastName'>
								{({ field, form }) => (
									<FormControl
										isInvalid={form.errors.lastName && form.touched.lastName}
										ml={'20px'}>
										<FormLabel htmlFor='lastName'> Last Name</FormLabel>
										<Input
											{...field}
											variant={'filled'}
											value={formData.lastName}
											onChange={(e) =>
												setFormData({ ...formData, lastName: e.target.value })
											}
											type='text'
											id='lastName'
											placeholder='Last Name'
										/>
										<FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
						</Flex>
						<Field name='email'>
							{({ field, form }) => (
								<FormControl isInvalid={form.errors.email && form.touched.email} mt={'20px'}>
									<FormLabel htmlFor='email'>Email</FormLabel>
									<Input
										{...field}
										variant={'filled'}
										value={formData.email}
										onChange={(e) => setFormData({ ...formData, email: e.target.value })}
										type='text'
										id='email'
										placeholder='Email Address'
									/>
									<FormErrorMessage>{form.errors.email}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Field name='dateOfBirth'>
							{({ field, form }) => (
								<FormControl
									isInvalid={form.errors.dateOfBirth && form.touched.dateOfBirth}
									mt={'20px'}>
									<FormLabel htmlFor='dateOfBirth'>Date Of Birth</FormLabel>
									<Input
										{...field}
										variant={'filled'}
										value={formData.dateOfBirth}
										onChange={(e) =>
											setFormData({ ...formData, dateOfBirth: e.target.value })
										}
										type='date'
										id='dateOfBirth'
									/>
									<FormErrorMessage>{form.errors.dateOfBirth}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

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
								Restore
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

export default checkAuth(AccountInfo);
