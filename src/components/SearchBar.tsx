import { Input } from "@nextui-org/react";
import { SearchIcon } from "./icons/SearchIcon";
import { FormEvent } from "react";


const SearchBar = () => {
	const search = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		const allData = Object.fromEntries(data.entries()) as unknown as any
		const { searchString } = allData
		console.log(searchString)
	}
	return (
		<form onSubmit={search}>
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
				name="searchString"
				variant="bordered"
				className="max-w-lg"
			/>
		</form>
	)
}

export default SearchBar