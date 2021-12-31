import { useEffect } from 'react';
import { ChakraProvider, extendTheme, theme as base } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import Navbar from '../components/sections/Landing/Navbar';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import useStore from '../store/store';
import { refreshToken } from '../actions/auth/login';
import Layout from '../components/layouts/Layout';

const breakpoints = createBreakpoints({
	sm: '30em',
	md: '48em',
	lg: '62em',
	xl: '80em',
	'2xl': '96em',
});

const theme = extendTheme({
	colors: {
		blue: {
			1000: '#213963',
			500: '#29487D',
			400: '#4175CB',
			300: '#5F88CE',
			200: '#6C9DEF',
			100: '#8AB1F3',
			50: '#EFF1FE',
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
	breakpoints,
});

function AtlacityApp({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState);
	const auth = store.getState().auth;

	useEffect(() => {
		//Request new access token every 6 minutes
		if (auth.isAuthenticated) {
			const authRefresh = async () => {
				store.dispatch(refreshToken());
			};
			setInterval(authRefresh, 100 * 60 * 60);
			authRefresh();
		}
	}, [auth]);

	return (
		!auth.isLoading && (
			<Provider store={store}>
				<ChakraProvider theme={theme}>
					<Layout>
						<Navbar />
						<Component {...pageProps} />
					</Layout>
				</ChakraProvider>
			</Provider>
		)
	);
}

export default AtlacityApp;
