import { Input } from "@nextui-org/react";
import { SearchIcon } from "./icons/SearchIcon";
import { FormEvent } from "react";


const SearchBar = () => {
	const search = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		const allData = Object.fromEntries(data.entries()) as unknown as any
		const { searchString } = allData
		window.location.href = `/search/${searchString}`
	}
	return (
		<form onSubmit={search} className="w-full" >
			<Input
				classNames={{
					base: "h-10",
					mainWrapper: "h-full",
					input: "text-small",
					inputWrapper: "h-full font-normal text-default-500",
				}}
				placeholder="Haber ara..."
				size="sm"
				startContent={<SearchIcon size={18} />}
				type="search"
				name="searchString"
				variant="bordered"
				className="w-full"
			/>
		</form>
	)
}

export default SearchBar