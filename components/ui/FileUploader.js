import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Center, useColorModeValue, Icon, Text, Avatar } from '@chakra-ui/react';
import { IoPersonCircle } from 'react-icons/io5';

export default function Dropzone({ onFileAccepted }) {
	const [fileLoaded, setFileLoaded] = useState(false);
	const [image, setImage] = useState(null);
	const onDrop = useCallback(
		(acceptedFiles) => {
			setFileLoaded(true);
			const imageURL = URL.createObjectURL(acceptedFiles[0]);
			setImage(imageURL);
			acceptedFiles[0].imageURL = imageURL;
			onFileAccepted(acceptedFiles[0]);
		},
		[onFileAccepted]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxFiles: 1,
		multiple: false,
	});

	const dropText = isDragActive ? 'Drop the phot here' : 'Upload Avatar';

	const activeBg = useColorModeValue('gray.100', 'gray.600');
	const borderColor = useColorModeValue(
		isDragActive ? 'teal.300' : 'gray.300',
		isDragActive ? 'teal.500' : 'gray.500'
	);

	return (
		<Center
			p={'20px'}
			w={'50%'}
			cursor='pointer'
			bg={isDragActive ? activeBg : 'transparent'}
			_hover={{ bg: activeBg }}
			transition='background-color 0.2s ease'
			borderRadius={4}
			border='3px solid'
			borderColor={borderColor}
			rounded={'lg'}
			{...getRootProps()}>
			<input {...getInputProps()} />
			{image ? <Avatar mr={2} src={image} /> : <Icon as={IoPersonCircle} mr={2} boxSize={'40px'} />}
			<Text fontSize='18px'>{!fileLoaded ? dropText : 'Avatar Selected!'}</Text>
		</Center>
	);
}
