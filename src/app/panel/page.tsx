import React from "react";
import { Button, Card, Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import { FaFileAlt, FaUser } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";



export default function PanelPage({ children }: any) {
	return (
		<div>
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
								Welcome back,
							</span>
							<span className="text-lg font-bold">Sium</span>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center gap-2 mt-4">
						<Button


							className="w-full"

						>
							<span className="flex items-center justify-center gap-2">
								<FaUser />
								<span>Kullanıcılar</span>
							</span>
						</Button>
						<Button


							className="w-full"

						>
							<span className="flex items-center justify-center gap-2">
								<FaFileAlt />
								<span>Yazılar</span>
							</span>
						</Button>
						<Button


							className="w-full"

						>
							<span className="flex items-center justify-center gap-2">
								<BsGraphUp />
								<span>İstatistikler</span>
							</span>
						</Button>
					</div>
				</Card>

			</aside>

			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				<Navbar
					isBordered
					className="w-full"
					classNames={{
						wrapper: "w-full max-w-full",
					}}
				>
					<NavbarContent className="md:hidden">
						<Button>a</Button>
					</NavbarContent>
					<NavbarContent className="w-full max-md:hidden">
						<Input
							startContent={"a"}
							isClearable
							className="w-full"
							classNames={{
								input: "w-full",
								mainWrapper: "w-full",
							}}
							placeholder="Search..."
						/>
					</NavbarContent>
					<NavbarContent
						justify="end"
						className="w-fit data-[justify=end]:flex-grow-0"
					>
						<div className="flex items-center gap-2 max-md:hidden">
							a
							<span>Feedback?</span>
						</div>

						sdfsdfsdf



						<Link
							href="https://github.com/Siumauricio/nextui-dashboard-template"
							target={"_blank"}
						>
							a
						</Link>
						<NavbarContent>
							sdfsdfsdf
						</NavbarContent>
					</NavbarContent>
				</Navbar>
				{children}
			</div>
		</div>
	);
};
