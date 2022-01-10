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
import PlacePhotosUploader from '../Places/PlacePhotosUploader';

const AddVisitModal = ({ initialFocusRef, finalFocusRef, isOpen, onClose, onSubmit, isInPlace = false }) => {
	const initialData = {
		place: '',
		title: '',
		description: '',
		rating: 0,
		photos: [],
		date: new Date().toLocaleDateString('en-CA'),
		isRecommended: false,
	};
	const [formData, setFormData] = useState(initialData);

	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleValidation = () => {
		const errors = {};
		if (!formData.description) {
			errors.description = 'Please enter a description';
		}
		if (!formData.title) {
			errors.description = 'Please enter a description';
		}
		if (formData.rating === 0) {
			errors.rating = 'Please enter a rating';
		}
		return errors;
	};
	return (
		<Modal
			size={'xl'}
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
										{!isInPlace && (
											<Field name='place'>
												{({ field, form }) => (
													<FormControl
														isInvalid={form.errors.place && form.touched.place}
														mt={'20px'}>
														<FormLabel htmlFor='place'>Place</FormLabel>
														<PlaceResults
															onSelect={(place) =>
																setFormData({ ...formData, place })
															}
														/>
														<FormErrorMessage>
															{form.errors.place}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
										)}
										<Field name='title'>
											{({ field, form }) => (
												<FormControl
													isInvalid={form.errors.title && form.touched.title}
													mt={'20px'}>
													<FormLabel htmlFor='title'>Title</FormLabel>
													<Input
														id={'title'}
														{...field}
														value={form.title}
														onChange={handleChange}
													/>
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
														value={form.description}
														onChange={handleChange}
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
													<Input
														{...field}
														type='date'
														id='date'
														onChange={handleChange}
													/>
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
															console.log(rating);
															setFormData({
																...formData,
																rating,
															});
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
													<Flex
														alignItems={'center'}
														justifyContent={'space-between'}
														fontSize={'18px'}>
														<Text htmlFor='recommended' mx={'10px'}>
															Would you recommend this place to others?
														</Text>
														<Checkbox
															color={'blue.700'}
															onChange={(e) =>
																setFormData({
																	...formData,
																	isRecommended: e.target.checked,
																})
															}
															size={'lg'}></Checkbox>
													</Flex>
													<FormErrorMessage>
														{form.errors.recommended}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name='photos'>
											{({ field, form }) => (
												<FormControl
													isInvalid={form.errors.photos && form.touched.photos}
													mt={'20px'}>
													<PlacePhotosUploader
														onFilesAccepted={(photos) =>
															setFormData({ ...formData, photos })
														}
													/>
													<FormErrorMessage>{form.errors.photos}</FormErrorMessage>
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
