import React, { useState, useEffect } from 'react';
import RegisterLayout from '../../components/layouts/auth/RegisterLayout';
import CompleteProfileLayout from '../../components/layouts/auth/CompleteProfileLayout';
import VerifyEmailLayout from '../../components/layouts/auth/VerifyEmailLayout';
import { useRouter } from 'next/router';
const Register = () => {
	const [registerStatus, setRegisterStatus] = useState('preregister');
	const router = useRouter();
	useEffect(() => {
		console.log(registerStatus);
	}, [registerStatus]);

	switch (registerStatus) {
		case 'preregister':
			return <RegisterLayout onRegisterSuccess={() => setRegisterStatus('completeprofile')} />;
		case 'completeprofile':
			return <CompleteProfileLayout onRegisterSuccess={() => setRegisterStatus('verifyemail')} />;
		case 'verifyemail':
			return <VerifyEmailLayout onVerificationSuccess={() => router.push('/')} />;
		default:
			return <RegisterLayout />;
	}
};

export default Register;
