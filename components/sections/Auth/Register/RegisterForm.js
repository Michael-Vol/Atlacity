import React from 'react';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	FormHelperText,
	Text,
} from '@chakra-ui/react';
import Button from '../../../ui/Button';
const RegisterForm = () => {
	return (
		<Flex flexDir={'column'} mr={'50px'} h={'90%'}>
			<Flex>
				<FormControl id='email'>
					<FormLabel>First Name</FormLabel>
					<Input type='text' />
				</FormControl>
				<FormControl id='email' ml={'20px'}>
					<FormLabel>Last Name</FormLabel>
					<Input type='text' />
				</FormControl>
			</Flex>
			<FormControl id='email' mt={'20px'}>
				<FormLabel>Email address</FormLabel>
				<Input type='email' />
				<FormHelperText>We'll never share your email.</FormHelperText>
			</FormControl>
			<FormControl id='password' mt={'20px'}>
				<FormLabel>Password</FormLabel>
				<Input type='password' />
				<FormHelperText>Choose a password with more than 6 characters.</FormHelperText>
			</FormControl>
			<FormControl id='dateOfBirth' mt={'20px'}>
				<FormLabel>Date Of Birth</FormLabel>
				<Input type='date' />
			</FormControl>
			<Box mt={'40px'} textAlign={'end'} mb={'20px'}>
				<Button bg='blue.400' color={'white'} size='lg'>
					Register
				</Button>
			</Box>
		</Flex>
	);
};

export default RegisterForm;
