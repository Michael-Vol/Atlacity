import React, { useState, useEffect } from 'react';
import {
	Flex,
	Text,
	Heading,
	FormControl,
	FormLabel,
	FormErrorMessage,
	useToast,
	Modal,
	ModalHeader,
	ModalContent,
	ModalBody,
	ModalFooter,
	ModalOverlay,
	ModalCloseButton,
	Badge,
} from '@chakra-ui/react';
import Button from '../../../../components/ui/Button';
import { Formik, Form, Field } from 'formik';
import PlacesAutocomplete from '../../../ui/PlacesAutocomplete';

const AddFavouriteModal = ({ type, initialFocusRef, finalFocusRef, isOpen, onClose, onSubmit }) => {
	const initialData = {
		favouriteCities: [],
	};
	const [formData, setFormData] = useState(initialData);

	const handleValidation = () => {
		const errors = {};
		if (formData.favouriteCities.length === 0) {
			errors.favouriteCities = 'Please select at least one favourite city';
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
			<ModalContent color={'teal'}>
				<ModalHeader>Add Favourite {type}</ModalHeader>
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
										<Field name='favouriteCities'>
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.favouriteCities &&
														form.touched.favouriteCities
													}>
													<FormLabel htmlFor='favouriteCities'>
														Favourite Cities
													</FormLabel>
													{formData.favouriteCities.map((place, index) => {
														return (
															<Badge
																key={index}
																m={'0px 10px 10px 0px'}
																p={'5px'}
																borderRadius={'6px'}
																colorScheme={'teal'}>
																<span>
																	{place.properties && (
																		<span>{place.properties.city} </span>
																	)}
																</span>
															</Badge>
														);
													})}
													<PlacesAutocomplete
														id='favouriteCityAutocomplete'
														type='favourites'
														onSelectedPlace={(place) => {
															if (
																!formData.favouriteCities.some(
																	(city) => city.fullName == place.fullName
																)
															) {
																setFormData({
																	favouriteCities: [
																		...formData.favouriteCities,
																		place,
																	],
																});
																form.setTouched({
																	...form.touched,
																	favouriteCities: true,
																});
															}
														}}
														clearSelectedPlace={() => {
															setFormData({
																...formData,
																favouriteCities:
																	formData.favouriteCities.slice(0, -1),
															});
														}}
													/>

													<FormErrorMessage>
														{form.errors.favouriteCities}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>

										<Flex my={'20px'} justifyContent={'flex-end'}>
											<Button
												size='md'
												mr={'20px'}
												variant={'outline'}
												color={'teal'}
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
												bg={'teal'}
												size='md'
												_hover={{ bg: 'teal.700' }}
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

export default AddFavouriteModal;
