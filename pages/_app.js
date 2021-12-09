import { ChakraProvider, extendTheme, theme as base } from '@chakra-ui/react';
import '../styles/globals.css';

const theme = extendTheme({
	colors: {
		blue: {
			500: '#00798a',
			400: '#008ea1',
			300: '#00a4ba',
			200: '#00bfd9',
			100: '#00daf7',
		},
		primary: '#00a4ba',
		secondary: '#00bfd9',
	},
	fonts: {
		heading: `Poppins, ${base.fonts.heading}`,
		body: `Nunito, ${base.fonts.body}`,
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
