import React, { useState } from 'react';
import RegisterLayout from '../../components/layouts/auth/RegisterLayout';
import CompleteProfileLayout from '../../components/layouts/auth/CompleteProfileLayout';
import VerifyEmailLayout from '../../components/layouts/auth/VerifyEmailLayout';
import { useSession } from 'next-auth/react';
const Register = () => {
	const { data: session, status } = useSession();
	const [registerStatus, setRegisterStatus] = useState('preregister');

	console.log(session, status);
	switch (registerStatus) {
		case 'preregister':
			return <CompleteProfileLayout />;
			return <RegisterLayout onRegisterSuccess={() => setRegisterStatus('completeprofile')} />;
		case 'completeprofile':
			return <CompleteProfileLayout />;
		case 'verifyemail':
			return <VerifyEmailLayout />;
		default:
			return <RegisterLayout />;
	}
};

export default Register;
