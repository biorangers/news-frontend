import { Card, CardBody, CardFooter, Chip, Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";

export default function NewsCard({ news, key }: NewsCardProps) {
	return <Card shadow="lg" key={key} >
		<CardBody className="overflow-visible p-2 ">
			<Image
				shadow="sm"
				radius="lg"
				width="100%"
				alt={news.articleTitle}
				className="w-full object-cover h-[200px]"
				src={news.articleImageURL}
			/>
			<b>{news.articleTitle}</b>
		</CardBody>
		<CardFooter className="text-small justify-between gap-4">
			<div className="justify-start">
				<Chip color="warning" variant="dot">{news.categoryName}</Chip>
			</div>
			<Chip endContent={<FaRegEye size={18} class="mr-2" />} variant="bordered" color="secondary"	>
				{news.articleView}
			</Chip>
			<Link href={`/haber/${news.articleID}`}>
				<Button>Habere git</Button>
			</Link>
		</CardFooter>

	</Card>
}