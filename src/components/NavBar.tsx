"use client"

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import SearchBar from "./SearchBar";

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
					<SearchBar />
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