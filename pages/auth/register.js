import React, { useState, useEffect } from 'react';
import RegisterLayout from '../../components/layouts/auth/RegisterLayout';
import CompleteProfileLayout from '../../components/layouts/auth/CompleteProfileLayout';
import VerifyEmailLayout from '../../components/layouts/auth/VerifyEmailLayout';
import { useRouter } from 'next/router';
import Navbar from '../../components/sections/Landing/Navbar';
const Register = () => {
	const [registerStatus, setRegisterStatus] = useState('preregister');
	const router = useRouter();
	const renderStatusPage = () => {
		switch (registerStatus) {
			case 'preregister':
				return <RegisterLayout onRegisterSuccess={() => setRegisterStatus('completeprofile')} />;
			case 'completeprofile':
				return (
					<CompleteProfileLayout
						onSkip={() => setRegisterStatus('verifyemail')}
						onRegisterSuccess={() => setRegisterStatus('verifyemail')}
					/>
				);
			case 'verifyemail':
				return (
					<VerifyEmailLayout
						onSkip={() => router.push('/')}
						onVerificationSuccess={() => router.push('/')}
					/>
				);
			default:
				return <RegisterLayout />;
		}
	};
	return (
		<div>
			<Navbar />
			{renderStatusPage()}
		</div>
	);
};

export default Register;
