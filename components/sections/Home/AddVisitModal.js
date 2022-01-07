import React, { useEffect, useState } from 'react';
import {
	Text,
	Flex,
	Modal,
	ModalHeader,
	ModalContent,
	ModalBody,
	ModalFooter,
	ModalOverlay,
	ModalCloseButton,
	FormControl,
	FormLabel,
	FormHelperText,
	FormErrorMessage,
	Textarea,
	Input,
	Checkbox,
} from '@chakra-ui/react';
import ReactStars from 'react-rating-stars-component';
import Button from '../../ui/Button';
import { Formik, Form, Field } from 'formik';
import PlaceResults from './PlaceResults';

const AddVisitModal = ({ initialFocusRef, finalFocusRef, isOpen, onClose, onSubmit }) => {
	const initialData = {
		place: {},
		description: '',
		rating: 0,
		date: new Date().toLocaleDateString('en-CA'),
		isRecommended: false,
	};
	const [formData, setFormData] = useState(initialData);

	const handleValidation = () => {
		const errors = {};
		console.log(formData);
		if (!formData.description) {
			errors.description = 'Please enter a description';
		}
		if (formData.rating === 0) {
			errors.rating = 'Please enter a rating';
		}
		return errors;
	};
	return (
		<Modal
			initialFocusRef={initialFocusRef}
			isOpen={isOpen}
			onClose={onClose}
			finalFocusRef={finalFocusRef}>
			<ModalOverlay />
			<ModalContent color={'blue.700'}>
				<ModalHeader>Add Visit</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<Flex flexDir={'column'} justifyContent={'center'} px={'20px'}>
						<Formik
							validate={handleValidation}
							enableReinitialize
							initialValues={initialData}
							onSubmit={(values, { setSubmitting }) => {
								setSubmitting(true);
								onSubmit(formData);
								setFormData(initialData);
								onClose();
							}}>
							{(props) => (
								<Form
									onKeyDown={(keyEvent) => {
										if (keyEvent.key === 'Enter') {
											keyEvent.preventDefault();
										}
									}}>
									<Flex flexDir={'column'}>
										<Field name='place'>
											{({ field, form }) => (
												<FormControl
													isInvalid={form.errors.place && form.touched.place}
													mt={'20px'}>
													<FormLabel htmlFor='place'>Place</FormLabel>
													<PlaceResults />
													<FormErrorMessage>{form.errors.place}</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name='description'>
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.description && form.touched.description
													}
													mt={'20px'}>
													<FormLabel htmlFor='description'>Description</FormLabel>
													<Textarea
														{...field}
														type='text'
														id='description'
														onChange={(e) =>
															setFormData({
																...formData,
																description: e.target.value,
															})
														}
														placeholder='Describe your visit...'
													/>
													<FormErrorMessage>
														{form.errors.description}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name='date'>
											{({ field, form }) => (
												<FormControl
													isInvalid={form.errors.date && form.touched.date}
													mt={'20px'}>
													<FormLabel htmlFor='date'>Date</FormLabel>
													<Input {...field} type='date' id='date' />
													<FormErrorMessage>{form.errors.date}</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name='rating'>
											{({ field, form }) => (
												<FormControl
													isInvalid={form.errors.rating && form.touched.rating}
													mt={'20px'}>
													<FormLabel htmlFor='rating'>Rating</FormLabel>
													<ReactStars
														count={5}
														size={30}
														onChange={(rating) => {
															setFormData({ ...formData, rating });
														}}
														isHalf={true}
														emptyIcon={<i className='far fa-star'></i>}
														halfIcon={<i className='fa fa-star-half-alt'></i>}
														fullIcon={<i className='fa fa-star'></i>}
														activeColor='#ffd700'
													/>
													<FormErrorMessage>{form.errors.rating}</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name='recommended'>
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.recommended && form.touched.recommended
													}
													mt={'20px'}>
													<Flex alignItems={'center'} fontSize={'18px'}>
														<Text htmlFor='recommended' mx={'10px'}>
															Would you recommend this place to others?
														</Text>
														<Checkbox color={'blue.700'} size={'lg'}></Checkbox>
													</Flex>
													<FormErrorMessage>
														{form.errors.recommended}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Flex m={'60px 0px 20px 0px'} justifyContent={'flex-end'}>
											<Button
												size='md'
												mr={'20px'}
												variant={'outline'}
												color={'blue.700'}
												bg={'white'}
												_hover={{ bg: 'gray.100' }}
												onClick={() => {
													setFormData(initialData);
													onClose();
												}}>
												Cancel
											</Button>
											<Button
												color={'white'}
												bg={'blue.700'}
												size='md'
												_hover={{ bg: 'blue.700' }}
												type='submit'>
												Add
											</Button>
										</Flex>
									</Flex>
								</Form>
							)}
						</Formik>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default AddVisitModal;
