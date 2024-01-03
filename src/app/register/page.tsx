"use client"

import React, { FormEvent, useState } from 'react';
import crypto from 'crypto';
import axios from 'axios';
import { Button, Card, Input, Link, Select, SelectItem } from '@nextui-org/react';

const Login = () => {
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		const allData = Object.fromEntries(data.entries()) as RegisterFormEntry
		const { name, surname, email, roleId } = allData

		const res = await axios.post('/api/UserOperation/RegisterUser', {
			"id": 0,
			"roleId": parseInt(roleId),
			"userName": name,
			"userSurname": surname,
			"userPassword": "a",
			"userEmail": email,
			"userRegistrationDate": new Date(),
			"statusID": 0,
			"userPPUrl": "a"
		})
		switch (res.status) {
			case 200:
				console.log('Başarılı')
				break;
			case 400:
				console.log('Başarısız')
				break;
			default:
				break;
		}


		// API isteği burada yapılabilir
	};

	return (
		<div className="flex justify-center items-center h-svh">
			<Card className=" p-8 rounded-lg shadow-md w-[400px]">
				<h1 className="text-3xl font-semibold">Kaydol</h1>
				<form className="space-y-4 mt-10" onSubmit={handleSubmit}>
					<div className='flex flex-col gap-3'>
						<Input
							type="text"
							name="name"
							className="w-full"
							variant='bordered'
							size='lg'
							label='Ad'
						/>
						<Input
							type="text"
							name="surname"
							className="w-full"
							variant='bordered'
							size='lg'
							label='Soyad'
						/>
						<Input
							type="email"
							name="email"
							className="w-full"
							variant='bordered'
							size='lg'
							label='E-posta'
						/>
						<Select
							name="roleId"
							className="w-full dark"
							variant='bordered'
							size='lg'
							label='Rol'
						>
							<SelectItem key={1}>Yazar</SelectItem>
							<SelectItem key={2}>Editör</SelectItem>
						</Select>
						{
							/*
							{
	"id": 0,
	"roleId": 0,
	"userName": "string",
	"userSurname": "string",
	"userPassword": "string",
	"userEmail": "string",
	"userRegistrationDate": "2024-01-02T15:06:35.057Z",
	"statusID": 0,
	"userPPUrl": "string"
}
							 */
						}

					</div>
					<Button
						type="submit"
						variant='shadow'
						className="w-full py-2"
						color='success'
						onClick={handleSubmit}
					>
						Kaydol
					</Button>

				</form>
				<div className='flex flex-row justify-between mt-2'>
					<Link
						href="/forgot-password">
						Şifremi Unuttum
					</Link>
					<Link href="/register">
						Hesabım Yok
					</Link>
				</div>
			</Card>
		</div>
	);
};

export default Login;