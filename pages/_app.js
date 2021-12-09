import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	colors: {
		emerald: {
			500: '#005c5c',
			400: '#009696',
			300: '#03abab',
			200: '#00bdbd',
			100: '#00d1d1',
		},
		primary: '#009696',
		secondary: '#00bdbd',
	},
});

function AtlacityApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default AtlacityApp;
