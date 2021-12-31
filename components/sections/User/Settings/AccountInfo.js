import React, { useState } from 'react';
import {
	Flex,
	Text,
	Heading,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Box,
	Badge,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Button from '../../../ui/Button';

const AccountInfo = () => {
	const auth = useSelector((state) => state.auth);

	const [formData, setFormData] = useState({
		firstName: auth.user.firstName,
		lastName: auth.user.lastName,
		email: auth.user.email,
		dateOfBirth: new Date(auth.user.dateOfBirth).toLocaleDateString('en-CA'),
	});

	const handleValidation = () => {
		const errors = {};

		return errors;
	};

	return (
		<Flex flexDir={'column'} color={'blue.500'}>
			<Heading fontSize={'36px'} fontWeight={'500'} mb={'40px'}>
				Account Info
			</Heading>

			<Flex my={'20px'}>
				<Text fontSize={'18px'} as='span' mr={'10px'}>
					Email Verifiation Status:
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
					to verify your Atlacity account.
				</Text>
			)}

			<Formik
				initialValues={formData}
				validate={handleValidation}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
				}}>
				<Form>
					<Flex>
						<Field name='firstName'>
							{({ field, form }) => (
								<FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
									<FormLabel htmlFor='firstName'> First Name</FormLabel>
									<Input
										{...field}
										variant={'filled'}
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
								<Input {...field} variant={'filled'} type='date' id='dateOfBirth' />
								<FormErrorMessage>{form.errors.dateOfBirth}</FormErrorMessage>
							</FormControl>
						)}
					</Field>

					<Box mt={'40px'} textAlign={'end'} mb={'20px'}>
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
			</Formik>
		</Flex>
	);
};

export default AccountInfo;
