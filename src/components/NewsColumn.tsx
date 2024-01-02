import { Card, CardHeader, Divider, CardBody, CardFooter, Image, Link, Chip } from "@nextui-org/react";

export default function NewsColumn({ news }: any) {
	return <Card className="">
		<CardHeader className="flex gap-3 items-center justify-center">
			<p className="text-lg font-bold">En Çok Okunanlar</p>
		</CardHeader>
		<Divider />
		<CardBody>
			<ul className="flex flex-col gap-4 ">
				{news?.length > 0 &&
					news.map((a: any, i: number) => {
						return <div key={i}>
							<Link
								href={`/haber/${a.articleID}`}>
								<Card className="flex flex-row gap-1">
									<CardHeader className="h-[100px] min-w-[100px] w-[100px]">
										<Image
											width="100%"
											alt="Haber"
											className="object-cover h-[100px] min-w-[100px] w-[100px] col-span-4 m-auto"
											src={`/api/images/${a.articleImageURL}`}
										/>
									</CardHeader>
									<CardBody className="  flex-row col-span-4 ">



										<p className="text-default-700 text-md font-bold col-span-3">{a.articleTitle}</p>
										<Chip className="capitalize" color="success" size="sm" variant="flat">{a.articleView}</Chip>
									</CardBody>

								</Card>
							</Link>
						</div>
					})
				}
			</ul>
		</CardBody>
		<CardFooter>
		</CardFooter>
	</Card>

}
