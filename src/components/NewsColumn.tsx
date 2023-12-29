import { Card, CardHeader, Divider, CardBody, CardFooter, Image, Link } from "@nextui-org/react";

export default function NewsColumn() {
	return <Card className="">
		<CardHeader className="flex gap-3 items-center justify-center">
			<p className="text-lg font-bold">En Çok Okunanlar</p>
		</CardHeader>
		<Divider />
		<CardBody>
			<ul className="flex flex-col gap-4 ">
				{
					[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => {
						return <div key={i}>
							<Card >
								<CardBody className="flex flex-row gap-4">

									<Image
										shadow="sm"
										radius="lg"
										width="100%"
										alt="Haber"
										className="w-full object-cover h-[100px] aspect-square"
										src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
									/>

									<li className="text-default-700 text-xl font-bold">Haber {i}</li>
								</CardBody>

							</Card>
						</div>
					})
				}
			</ul>
		</CardBody>
		<CardFooter>
		</CardFooter>
	</Card>

}

/*
<h1 className="text-3xl font-bold text-center">Haberler</h1>
				<ul className="flex flex-col gap-4 ">

					<li className="text-gray-500">1</li>
					<li className="text-gray-500">2</li>
					<li className="text-gray-500">3</li>
					<li className="text-gray-500">4</li>
					<li className="text-gray-500">5</li>

				</ul>
				 */