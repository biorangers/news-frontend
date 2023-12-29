import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from 'next/router'
import axios from 'axios'

export default async function Page({ params }: { params: { postid: string } }) {

	const res = await fetch(`http://localhost:5074/api/News/GetNewsById/${params.postid}`);
	const newsData = (await res.json())[0]

	return (
		<div className="container p-2 mt-2 prose max-w-[900px] prose-stone dark:prose-invert text-neutral-300 flex flex-col justify-center mx-auto">
			<Image
				src={newsData.articleImageURL}
				alt={newsData.articleTitle}
				width="100%"
				height="100%"
				className="w-full object-cover aspect-video"
			/>
			<h1>{newsData.articleTitle}</h1>
			<p dangerouslySetInnerHTML={{ __html: newsData.articleContent }} />
		</div>
	);
}