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
			<Card className=" p-8 rounded-lg shadow-md w-[400px] h-[500px]">
				<h1 className="text-2xl font-semibold mb-4">Giriş Yap</h1>
				<form className="space-y-4 mt-10" onSubmit={handleSubmit}>
					<div>
						<Input
							type="email"
							id="email"
							placeholder="E-posta adresinizi girin"
							className="w-full"
							variant='bordered'
							value={email}
							label='E-posta Adresi'
							labelPlacement="outside"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password" className="block mb-1">
							Şifre
						</label>
						<Input
							type="password"
							id="password"
							placeholder="Şifrenizi girin"
							className="w-full"
							variant='bordered'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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