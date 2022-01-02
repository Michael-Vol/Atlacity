import { useEffect } from 'react';
import { ChakraProvider, extendTheme, theme as base } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import Navbar from '../components/sections/Landing/Navbar';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { refreshToken } from '../actions/auth/login';
import { loadUser } from '../actions/auth/loadUser';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from '../store/store';
import Router from 'next/router';
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
		if (!auth.isLoading) {
			if (auth.isAuthenticated) {
				const authRefresh = async () => {
					store.dispatch(refreshToken());
				};
				setInterval(authRefresh, 100 * 60 * 60);
				authRefresh();
			}
		}
	}, [auth]);

	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		!auth.isLoading && (
			<PersistGate loading={null} persistor={store.__persistor}>
				<ChakraProvider theme={theme}>
					<Navbar />
					<Component {...pageProps} />
				</ChakraProvider>
			</PersistGate>
		)
	);
}

export default wrapper.withRedux(AtlacityApp);
