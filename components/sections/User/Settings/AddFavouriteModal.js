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

const AddFavouriteModal = ({ type, initialFocusRef, finalFocusRef, isOpen, onClose }) => {
	const [formData, setFormData] = useState({
		favouriteCities: [],
	});

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
					<Flex flexDir={'column'} mr={'50px'}>
						<Formik
							enableReinitialize
							initialValues={formData}
							validate={handleValidation}
							onSubmit={(values, { setSubmitting }) => {
								setSubmitting(true);
								onSubmit(values);
							}}>
							{(props) => (
								<Form
									onKeyDown={(keyEvent) => {
										if (keyEvent.key === 'Enter') {
											keyEvent.preventDefault();
										}
									}}>
									<Flex>
										<Field name='favouriteCities'>
											{({ field, form }) => (
												<FormControl
													mt={'20px'}
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
																mb={2}
																mr={2}
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
																	...formData,
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
													<FormHelperText>
														Choose your favourite cities{' '}
													</FormHelperText>
													<FormErrorMessage>
														{form.errors.favouriteCities}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
									</Flex>
								</Form>
							)}
						</Formik>
					</Flex>
				</ModalBody>
				<ModalFooter>
					<Flex>
						<Button
							size='md'
							mr={'20px'}
							variant={'outline'}
							color={'teal'}
							bg={'white'}
							_hover={{ bg: 'gray.100' }}
							onClick={onClose}>
							Cancel
						</Button>
						<Button
							color={'white'}
							bg={'teal'}
							size='md'
							onClick={onClose}
							_hover={{ bg: 'teal.700' }}>
							Add
						</Button>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddFavouriteModal;
