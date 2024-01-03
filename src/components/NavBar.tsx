"use client"

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

function NavBar() {
	const [categories, setCategories] = useState([]);
	const fetchCategories = async () => {
		const categoriesData = (await axios.get('/api/News/GetAllCategories')).data

		const categories = categoriesData.reduce((acc: any, cur: any) => {
			acc.push({ label: cur.categoryName, key: cur.id.toString() });
			return acc;
		}, [])

		setCategories(categories);
	}


	useEffect(() => {
		fetchCategories();
	}, [])
	return (
		<Navbar shouldHideOnScroll>
			<NavbarBrand>

				<Link className="font-bold text-inherit" href='/'>HABERTO</Link>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Dropdown>
						<DropdownTrigger>
							<Button
								variant="bordered"
								endContent={<FaAngleDown />}
							>
								Kategoriler
							</Button>
						</DropdownTrigger>
						<DropdownMenu>
							{categories.map((category: any) => (<DropdownItem key={category.key} href={`/kategori/${category.key}`}> {category.label} </DropdownItem>))}

						</DropdownMenu>
					</Dropdown>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<Input
						classNames={{
							base: "max-w-lg sm:max-w-[10rem] h-10",
							mainWrapper: "h-full",
							input: "text-small",
							inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
						}}
						placeholder="Type to search..."
						size="sm"
						startContent={<SearchIcon size={18} />}
						type="search"
						className="max-w-lg"
					/>
				</NavbarItem>
				<NavbarItem>
					<Button as={Link} color="primary" href="/register" variant="flat">
						Bizimle Çalış
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}


export default NavBar;