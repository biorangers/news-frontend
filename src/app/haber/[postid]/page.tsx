import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from 'next/router'
import axios from 'axios'
import AuthorCard from "@/components/AuthorCard";
import Viewer from "@/components/Viewer";

export default async function Page({ params }: { params: { postid: string } }) {

	const res = await fetch(`http://localhost:5074/api/News/GetNewsById/${params.postid}`);
	const newsData = (await res.json())[0]
	const authorData = await (await axios.get(`http://localhost:5074/api/User/GetAllAuthors`)).data
	const author = authorData.find((author: any) => author.authorId === newsData.authorID)
	return (
		<div className="container p-2 mt-2 prose max-w-[900px] prose-stone dark:prose-invert text-neutral-300 flex flex-col justify-center mx-auto">
			<Image
				src={`/api/images/${newsData.articleImageURL}`}
				alt={newsData.articleTitle}
				width="100%"
				height="100%"
				className="w-full object-cover aspect-video"
			/>
			<h1>{newsData.articleTitle}</h1>
			<div dangerouslySetInnerHTML={{ __html: newsData.articleContent.replace(/\\/g, '').replace(/^"(.*)"$/, '$1') }} />
			<AuthorCard author={author} />
			<Viewer articleId={params.postid} />
		</div>
	);
}