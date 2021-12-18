import { compare } from 'bcryptjs';
import getEnv from '../config/env';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';

export async function verifyPassword(password, hashedPassword) {
	const isValid = await compare(password, hashedPassword);
	return isValid;
}

export const refreshToken = () => {
	return fetch('/api/refresh_token', {
		method: 'POST',
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((data) => {
			return data;
		});
};

export const createAccessToken = (user) => {
	try {
		const ACCESS_TOKEN_SECRET = getEnv('ACCESS_TOKEN_SECRET');
		return sign({ user: user._id }, ACCESS_TOKEN_SECRET, {
			expiresIn: '15m',
		});
	} catch (error) {
		return console.log(error);
	}
};

export const createRefreshToken = (user) => {
	try {
		const REFRESH_TOKEN_SECRET = getEnv('REFRESH_TOKEN_SECRET');
		return sign({ userId: user.id }, REFRESH_TOKEN_SECRET, {
			expiresIn: '7d',
		});
	} catch (error) {
		return console.log(error);
	}
};

export const sendRefreshToken = (res, token) => {
	res.setHeader(
		'Set-Cookie',
		cookie.serialize('refreshToken', token, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
			path: '/',
		})
	);
};
