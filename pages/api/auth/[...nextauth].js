import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import connectToDB from '../../../lib/db';
import User from '../../../models/User';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		Credentials({
			name: 'Credentials',
			async authorize(credentials) {
				const db = await connectToDB();
				const user = await User.findOne({
					email: credentials.email,
				});

				if (!user) {
					throw new Error('User not found...');
				}

				const isVerified = await verifyPassword(credentials.password, user.password);

				if (!isVerified) {
					throw new Error('Invalid password...');
				}

				return user;
			},
		}),
	],
});
