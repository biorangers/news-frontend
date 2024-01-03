
import { Card, Image, CardBody } from "@nextui-org/react";

const AuthorCard = ({ author }: any) => {
	return (
		<Card className="flex flex-row justify-between mt-2" isBlurred>
			<CardBody className="flex flex-row gap-2">
				<Image
					src={`/api/images/img_638398758701267350_1af6d770-c02e-42c7-b087-d1d4b38729fa.webp`}
					alt={author.userName}
					width="100%"
					height="100%"
					className="h-[100px] object-cover"
				/>
				<div className="flex flex-col my-auto ml-2 justify-start">
					<p className="text-xl font-bold">{author.userName} {author.userSurname}</p>
					<p className="text-md">{author.authorBio}</p>
				</div>
			</CardBody>
		</Card>
	)
}
{/* "userName": "Ava",
    "userSurname": "Lopez",
    "authorBio": "Hello everyone! I am a new writer here.", */}

export default AuthorCard;