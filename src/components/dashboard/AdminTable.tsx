"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";

const statusColorMap: any = {
	'Aktif': "success",
	'Reddedildi': "danger",
	'Beklemede': "warning",
	'Pasif': "default",
};
/*
{
		"userId": 12,
		"roleId": 1,
		"roleName": "Author",
		"userName": "John",
		"userSurname": "Doe",
		"userEmail": "john@example.com",
		"userRegistrationDate": "2023-01-15T00:00:00",
		"statusID": 3,
		"statusName": "Aktif"
	},
	 */
const columns = [
	{ name: "İsim", uid: "name" },
	{ name: "Rol", uid: "role" },
	{ name: "Durum", uid: "status" },
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

export default function AdminTable({ users }: { users: any[] }) {


	const renderCell = React.useCallback((user: any, columnKey: any) => {
		const cellValue = user[columnKey];

		switch (columnKey) {
			case "name":
				return (
					<User
						description={user.userEmail}
						name={`${user.userName} ${user.userSurname}`}
					>
					</User>
				);
			case "role":
				return (
					<p className="text-bold text-sm capitalize">{user.roleName}</p>
				);
			case "status":
				return (
					<Chip className="capitalize" color={statusColorMap[user.statusName]} size="sm" variant="flat">
						{user.statusName}
					</Chip>
				);
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip content="Details">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<FaEye />
							</span>
						</Tooltip>
						<Tooltip content="Edit user">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<FaPencilAlt />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Delete user">
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
			<TableBody items={users}>
				{(item) => (
					<TableRow key={item.userId}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
