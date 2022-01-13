import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Flex, useColorModeValue, Box, Icon, Text, Avatar } from '@chakra-ui/react';
import { IoPersonCircle, IoMdPhotos } from 'react-icons/io';
import Image from 'next/image';

export default function Dropzone({ onFilesAccepted }) {
	const [filesLoaded, setFilesLoaded] = useState(false);
	const [urls, setUrls] = useState([]);
	const [files, setFiles] = useState([]);
	const onDrop = useCallback(
		(acceptedFiles) => {
			setFilesLoaded(true);
			const newUrls = acceptedFiles.map((file) => URL.createObjectURL(file));

			setUrls([...urls, ...newUrls]);
			setFiles([...files, ...acceptedFiles]);
			onFilesAccepted([...files, ...acceptedFiles]);
		},
		[onFilesAccepted]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxFiles: 5,
		multiple: false,
	});

	const dropText = isDragActive ? 'Drop the photo(s) here' : 'dsf';

	const activeBg = useColorModeValue('gray.100', 'gray.600');
	const borderColor = useColorModeValue(
		isDragActive ? 'teal.300' : 'gray.300',
		isDragActive ? 'teal.500' : 'gray.500'
	);

	return (
		<Flex flexDir={'column'}>
			<Flex
				w={'20%'}
				justifyContent={'center'}
				p={'10px'}
				cursor='pointer'
				bg={isDragActive ? activeBg : 'transparent'}
				_hover={{ bg: activeBg }}
				transition='background-color 0.2s ease'
				borderRadius={4}
				border='2px solid'
				borderColor={borderColor}
				rounded={'lg'}
				{...getRootProps()}>
				<input {...getInputProps()} />
				<Icon as={IoMdPhotos} mr={2} boxSize={'30px'} />
			</Flex>
			{urls.length > 0 && (
				<Flex
					my={'10px'}
					borderRadius={4}
					p={'10px'}
					border='2px solid'
					borderColor={'gray.300'}
					gap={6}>
					{urls.map((url, index) => (
						<Box mx={'10px'}>
							<Image key={index} src={url} width={'60px'} height={'60px'} />
						</Box>
					))}
				</Flex>
			)}
		</Flex>
	);
}
