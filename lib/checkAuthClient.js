import useStore from '../store/store';
import { useRouter } from 'next/router';

const withAuth = (Component) => {
	const Auth = (props) => {
		const store = useStore();
		const router = useRouter();
		if (store.getState().auth.accessToken !== null) {
			return <Component {...props} />;
		} else {
			return router.replace('/');
		}
	};
	return Auth;
};

export default withAuth;
