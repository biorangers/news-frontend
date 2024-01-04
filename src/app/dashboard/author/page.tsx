"use client"

import React, { use, useEffect, useState } from "react";
import {
	Button,
	Card,
	Input,
	Link,
	Navbar,
	NavbarContent,
} from "@nextui-org/react";
import { FaFileAlt, FaUser } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import NewsTable from "@/components/dashboard/NewsTable";

import { useRouter } from "next/navigation";
import EditorTable from "@/components/dashboard/EditorTable";
import AuthorTable from "@/components/dashboard/AuthorTable";

export default function PanelPage() {

	const userInfo = {
		"authorId": 2,
		"userId": 15,
		"userName": "Sophia",
		"userSurname": "Brown",
		"authorBio": "Hello everyone! I am a new writer here.",
		"userEmail": "sophia@example.com",
		"userRegistrationDate": "2023-04-05T00:00:00"
	}
	const [news, setNews] = useState([]);
	const fetchData = async () => {
		const res = await fetch(`/api/News/GetNewsByAuthorId/1, 2`)
		const data = await res.json()
		setNews(data)
	}

	useEffect(() => {
		fetchData()
	}, [])



	return (
		<div className="grid grid-cols-5">
			<aside className="h-screen z-[202] sticky top-0  max-w-xs">
				<Card className="w-full h-full p-2">
					<div className="flex flex-col items-center justify-center gap-2">
						<div className="flex flex-col items-center justify-center">
							<span className="text-2xl font-bold mt-2">HABERTO</span>
							<span className="text-sm font-medium text-neutral-500">
								Dashboard Template
							</span>
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
					<AuthorTable news={news} />
				</div>

			</main>
		</div>
	);
}
