import { ChakraProvider } from '@chakra-ui/react';

function AtlacityApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default AtlacityApp;
