"use client"

import React, { useState } from 'react';
import crypto from 'crypto';
import axios from 'axios';
import { Button, Card, Input, Link } from '@nextui-org/react';

const Login = () => {
	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const data = new FormData(e.target as HTMLFormElement);
		const allData = Object.fromEntries(data.entries()) as any
		const { email, password } = allData
		const hashedPassword = crypto
			.createHash('sha256')
			.update(password)
			.digest('hex');

		console.log('Email:', email);
		console.log('Hashed Password:', hashedPassword);

		const res = await axios.get('/api/Auth/GetToken', { params: { email, password: hashedPassword, roleID: 0, userID: 0 } });
		// set auth token
		const token = res.data
		// set header token browser local storage
		localStorage.setItem('token', token);
		// Set the token in axios default header
		axios.defaults.headers.common["Authorization"] = "Bearer " + token;
		// redirect to dashboard
		window.location.href = '/dashboard'
	};

	const logout = () => {
		localStorage.removeItem('token')
		window.location.href = '/login'
	}

	// check if user is logged in
	const token = localStorage.getItem('token')


	return (
		<div className="flex justify-center items-center h-svh">
			<Card className=" p-8 rounded-lg shadow-md w-[400px]">
				{!token && <div>
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
				</div>}
				{token && <div>
					<h1 className="text-3xl font-semibold">Çıkış Yap</h1>
					<Button
						onClick={logout}
						variant='shadow'
						className="w-full py-2 mt-4"
						color='danger'
					>
						Çıkış Yap
					</Button>
				</div>}
			</Card>

		</div>
	);
};

export default Login;