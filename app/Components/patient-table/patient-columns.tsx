"use client"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef, Column } from "@tanstack/react-table"

import { MdMan4 } from "react-icons/md"
import { FaFemale } from "react-icons/fa"
import { CheckedState } from "@radix-ui/react-checkbox"
import { Patient } from "@/app/data/patients-data"
import { IoMdArrowUp, IoMdArrowDown } from "react-icons/io"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

function SortableHeader({
	column,
	label,
}: {
	column: Column<Patient, unknown>
	label: string 
}) {
	const isSorted = column.getIsSorted()

	const SortedIcon = 
		isSorted === "asc"
		? IoMdArrowUp
		: isSorted === "desc"
		? IoMdArrowDown
		: ArrowUpDown

	return (
		<Button
			variant="ghost"
			className={`h-3 ${isSorted && "text-primary"} text-start`}
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
			{label}
			<SortedIcon className="ml-2 size-4"/>
		</Button>
	)
}

export const columns: ColumnDef<Patient>[] = [
  {
	id: "select",
	header: ({ table }) => (
		<div className="pl-4">
			<Checkbox checked={table.getIsAllPageRowsSelected()} 
			onCheckedChange={(value: CheckedState) =>
			 table.toggleAllPageRowsSelected(!!value)} 
			 aria-label="Select all" 
			/>
		</div>
	),
	cell: ({ row }) => (
		<div className="pl-4">
			<Checkbox 
				checked={row.getIsSelected()} 
				onCheckedChange={(value) => row.toggleSelected(!!value)} 
			 	aria-label="Select row" 
			/>
		</div>
	),
	enableSorting: false,
	enableHiding: false,
  },

  {
	header: ({ column }) => {
		return <SortableHeader column={column} label="First Name" />
	},
	accessorKey: "firstName",

	cell: ({ row }) => {
		const firstName = row.original.firstName
		const gender = row.original.gender
		const genderIcon = 
			gender === "Male" ? (
				<MdMan4 className="text-lg text-primary" /> 
			) : (
				<FaFemale className="text-lg text-primary" />
			)
		
		return (
			<div className="flex items-center gap-3">
				<div className="size-7 rounded-sm bg-primary/25 flex items-center justify-center">
					{genderIcon}
				</div>
				<span>{firstName}</span>
			</div>
		)
	},
	filterFn: "nameSearchFilter",
  },
  {
	header: ({ column }) => {
		return <SortableHeader column={column} label="Last Name" />
	},
	accessorKey: "lastName",
	filterFn: "nameSearchFilter",
  },
  {
	header: ({ column }) => {
		return <SortableHeader column={column} label="Diagnosis" />
	},
	accessorKey: "diagnosis",
	cell: ({ row }) => (
		<Badge className="bg-primary/15 text-primary font-medium hover:text-white shadow-none">
			{row.getValue("diagnosis")}
		</Badge>
	)
  },
  {
	header: ({ column }) => {
		return <SortableHeader column={column} label="Gender" />
	},
	accessorKey: "gender",
  },
  {
	header: ({ column }) => {
		return <SortableHeader column={column} label="Appointment Date" />
	},
	accessorKey: "appointmentDate",
  },
  {
	header: ({ column }) => {
		return <SortableHeader column={column} label="Last Visit" />
	},
	accessorKey: "lastVisit",
  },
  {
	accessorKey: "actions",
	header: "",

	id: "actions",
  },
]
