"use client"

import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
} from "@nextui-org/react";
import { FaFileAlt, FaUser } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";

import { useRouter } from "next/navigation";
import AdminTable from "@/components/dashboard/AdminTable";

export default function PanelPage() {
	const [users, setUsers] = useState([]);
	const fetchData = async () => {
		const res = await fetch('/api/User')
		const data = await res.json()
		setUsers(data)
	}

	useEffect(() => {
		fetchData()
	}, [])
	const userInfo = {
		"adminId": 1,
		"userId": 14,
		"userName": "Michael",
		"userSurname": "Johnson",
		"userEmail": "michael@example.com",
		"userRegistrationDate": "2023-03-10T00:00:00"
	}

	return (
		<div className="grid grid-cols-5">
			<aside className="h-screen z-[202] sticky top-0  max-w-xs">
				<Card className="w-full h-full p-2">
					<div className="flex flex-col items-center justify-center gap-2">
						<div className="flex flex-col items-center justify-center">
							<span className="text-2xl font-bold mt-2">HABERTO</span>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center gap-2 mt-4">
						<div className="flex flex-col items-center justify-center gap-2">
							<span className="text-sm font-medium text-neutral-500">
								Tekrar hoş geldin,
							</span>
							<span className="text-lg font-bold">{`${userInfo.userName} ${userInfo.userSurname}`}</span>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center gap-2 mt-4">
						<Button className="w-full">
							<span className="flex items-center justify-center gap-2">
								<FaUser />
								<span>Kullanıcılar</span>
							</span>
						</Button>
						<Button className="w-full">
							<span className="flex items-center justify-center gap-2">
								<FaFileAlt />
								<span>Yazılar</span>
							</span>
						</Button>
						<Button className="w-full">
							<span className="flex items-center justify-center gap-2">
								<BsGraphUp />
								<span>İstatistikler</span>
							</span>
						</Button>
					</div>
				</Card>
			</aside>

			<main className="col-span-4">
				<div className="flex flex-col items-center justify-center gap-2 mt-4 p-4">
					<AdminTable users={users} />
				</div>

			</main>
		</div>
	);
}
