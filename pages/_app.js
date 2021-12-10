import { ChakraProvider, extendTheme, theme as base } from '@chakra-ui/react';
import '../styles/globals.css';

const theme = extendTheme({
	colors: {
		blue: {
			500: '#29487D',
			400: '#4175CB',
			300: '#5F88CE',
			200: '#6C9DEF',
			100: '#8AB1F3',
			50: '#f2f6fc',
		},
		primary: '#5F88CE',
		secondary: '#6C9DEF',
	},
	components: {
		Text: {
			bgColor: 'white',
		},
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
