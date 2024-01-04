"use client"

import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Image, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from 'next/router'
import axios from 'axios'
import NewsEditor from "@/components/edit/Editor";
import { FaCloudUploadAlt } from "react-icons/fa";
import FileInput from "@/components/edit/FileInput";

export default function Page() {
	const [news, setNews] = useState({
		"id": 0,
		"categoryId": 1,
		"statusId": 3,
		"authorId": 2,
		"editorId": 1,
		"permissionId": 1,
		"title": "string",
		"content": "string",
		"imageUrl": "string",
		"publishedDate": new Date(),
		"views": 0,
		"previousStatusID": 1,
		"statusModifiedDate": new Date(),
		"articleShow": "E"
	} as any);
	const [author, setAuthor] = useState({});
	const [categories, setCategories] = useState([] as CategorySelectItem[]);
	const [updating, setUpdating] = useState(false);
	const [uploadedFile, setUploadedFile] = useState("");
	const fetchData = async () => {
		try {

			const authorData = await (await axios.get(`/api/User/GetAllAuthors`)).data
			const author = authorData.find((author: any) => author.authorId === 2)
			const categoryData = await (await fetch("/api/News/GetAllCategories")).json();
			setAuthor(author);
			setCategories(categoryData.reduce((acc: any, cur: any) => {
				acc.push({ label: cur.categoryName, value: cur.id.toString() });
				return acc;
			}, []));
			setUploadedFile(news.articleImageURL);
		} catch (error) {
			console.error("Haberleri getirirken hata oluştu:", error);
		}
	};
	const updateNews = async () => {
		setUpdating(true);
		try {
			const res = await axios.post(`/api/NewsOperation/CreateArticle`,
				{
					...news,
					"categoryID": categories.find((c: any) => c.label === news.categoryName)?.value || 1,
					"title": news.articleTitle,
					"content": news.articleContent,
					categoryId: categories.find((c: any) => c.label === news.categoryName)?.value || 1,
					"imageUrl": uploadedFile,
				}
			);
			setUpdating(false);
		} catch (error) {
			console.error("Haber güncellenirken hata oluştu:", error);
			setUpdating(false);
		}
	};

	useEffect(() => {
		// Sayfa yüklendiğinde veya belirli bir koşula göre haberleri yükleme
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Bu etkileşim sadece bir kez çalışacak şekilde yapılandırıldı, isteğe bağlı olarak koşula göre güncellenebilir


	return (
		<div className='flex justify-center flex-col items-center mt-20 gap-2 relative'>
			<div className="gap-2 flex flex-col items-center">
				<div className="gap-2 grid grid-flow-row grid-cols-3 max-w-[900px]">
					<div className="col-span-2 flex flex-col gap-2">
						<Input
							label="Başlık" placeholder="Başlık giriniz"
							variant="bordered"
							className="max-w-lg"
							isInvalid={news.articleTitle?.length < 5}
							onChange={(e) => setNews({ ...news, articleTitle: e.target.value })}
						/>

						<Select
							items={categories}
							label="Kategori"
							placeholder="Kategori seçiniz"
							className="max-w-lg"
							variant="bordered"
						>
							{categories.map((c: any) => <SelectItem key={c.value}>{c.label}</SelectItem>)}
						</Select>
						<FileInput uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
					</div>
					<Image
						src={`/api/images/${uploadedFile}` || `/api/images/${news.articleImageURL}`}
						alt="Resim"
						width={400}
						height={400}
						className="rounded-md aspect-video"
					/>
				</div>
				<NewsEditor html='<p>Haber metni</p>' news={news} setNews={setNews} />
				<Button
					variant="shadow"
					color="success"
					isLoading={updating}
					startContent=<FaCloudUploadAlt />
					onClick={
						() => {
							updateNews();
						}
					}
				>
					Oluştur
				</Button>
			</div>

		</div>
	);
}