import { Card, CardBody, CardFooter, Chip, Button, Image, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import Router from "next/router";
export default function NewsCard({ news, key }: NewsCardProps) {
	return <Link href={`/haber/${news.articleID}`}>
		<Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
			<CardHeader className="absolute z-10 top-1 flex-col items-start">
				<h4 className="text-white font-medium text-2xl">{news.articleTitle}</h4>
			</CardHeader>
			<Image
				removeWrapper
				alt="Card example background"//make image darker 
				className="z-0 w-full h-full scale-110 -translate-y-6 object-cover bg-black/30 filter brightness-[0.4]"
				src={`/api/images/${news.articleImageURL}`}
			/>
			<CardFooter className="absolute bg-black/30 bottom-0 z-10 justify-between">


				<Chip color="warning" variant="dot">{news.categoryName}</Chip>


				<Chip endContent={<FaRegEye size={18} class="mr-2" />} variant="bordered" color="secondary"	>
					{news.articleView}
				</Chip>


			</CardFooter>

		</Card>

	</Link >

}