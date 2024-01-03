"use client"

import React, { useState } from 'react';
import crypto from 'crypto';
import axios from 'axios';
import { Button, Card, Input, Link } from '@nextui-org/react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		// Şifreyi SHA256 ile hashle
		const hashedPassword = crypto
			.createHash('sha256')
			.update(password)
			.digest('hex');

		console.log('Email:', email);
		console.log('Hashed Password:', hashedPassword);
		// make API request here
		const loginRequest = async () => {
			const res = await axios.post('/api/login', { email, password: hashedPassword })
		}

		// API isteği burada yapılabilir
	};

	return (
		<div className="flex justify-center items-center h-svh">
			<Card className=" p-8 rounded-lg shadow-md w-[400px]">
				<h1 className="text-3xl font-semibold">Giriş Yap</h1>
				<form className="space-y-4 mt-10" onSubmit={handleSubmit}>
					<div className='flex flex-col gap-4'>
						<Input
							type="email"
							name="email"
							className="w-full"
							variant='bordered'
							size='lg'
							label='E-posta'
						/>
						<Input
							type="password"
							name="password"
							className="w-full"
							variant='bordered'
							size='lg'
							label='Şifre'
						/>

					</div>
					<Button
						type="submit"
						variant='shadow'
						className="w-full py-2"
						color='primary'
					>
						Giriş Yap
					</Button>
					<div className='flex flex-row justify-between'>
						<Link
							href="/forgot-password">
							Şifremi Unuttum
						</Link>
						<Link href="/register">
							Hesabım Yok
						</Link>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default Login;