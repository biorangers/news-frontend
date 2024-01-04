"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Link } from "@nextui-org/react";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";

const statusColorMap: any = {
	'Aktif': "success",
	'Reddedildi': "danger",
	'Beklemede': "warning",
	'Pasif': "default",
};
/*
 {
		"articleID": 15456,
		"articleTitle": "Deneme2",
		"categoryName": "Spor",
		"articleImageURL": "img_638399447250196209_225bfcc3-1808-4046-99a4-ec0ac98bddc0.webp",
		"articlePublishedDate": "2024-01-04T02:58:02.833",
		"articleView": 11
	},
	 */
const columns = [
	{ name: "Başlık", uid: "name" },
	{ name: "Kategori", uid: "role" },
	{ name: "View", uid: "status" },
	{ name: "Eylemler", uid: "actions" },
];
/*{
		id: 1,
		name: "Tony Reichert",
		role: "CEO",
		team: "Management",
		status: "active",
		age: "29",
		avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
		email: "tony.reichert@example.com",
	}, */

export default function AuthorTable({ news }: { news: any[] }) {


	const renderCell = React.useCallback((news: any, columnKey: any) => {
		const cellValue = news[columnKey];

		switch (columnKey) {
			case "name":
				return (
					<User

						name={news.articleTitle}
						avatarProps={
							{
								src: `/api/images/${news.articleImageURL}`,
								size: "sm",
								alt: "Article Image",
							}
						}

					>
					</User>
				);
			case "role":
				return (
					<p className="text-bold text-sm capitalize">{news.categoryName}</p>
				);
			case "status":
				return (
					<Chip className="capitalize" color="secondary" size="sm" variant="flat">
						{news.articleView}
					</Chip>
				);
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip content="Details">
							<Link className="text-lg text-default-400 cursor-pointer active:opacity-50" href={`/haber/${news.articleID}`}>
								<FaEye />
							</Link>
						</Tooltip>
						<Tooltip content="Edit">
							<Link className="text-lg text-default-400 cursor-pointer active:opacity-50" href={`/edit/${news.articleID}`}>
								<FaPencilAlt />
							</Link>
						</Tooltip>
						<Tooltip color="danger" content="Delete">
							<span className="text-lg text-danger cursor-pointer active:opacity-50">
								<FaTrash />
							</span>
						</Tooltip>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	return (
		<Table aria-label="Example table with custom cells">
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={news}>
				{(item) => (
					<TableRow key={item.articleID}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
