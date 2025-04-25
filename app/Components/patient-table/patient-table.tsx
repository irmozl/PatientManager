import {
	getSortedRowModel,
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
} from '@tanstack/react-table';

import { Skeleton } from '@/components/ui/skeleton';
import { Patient } from '@/app/data/patients-data';
import { DataTable } from './data-table';
import { columns } from './patient-columns';
import { SortingProps } from '@/app/page';
import PaginationArea from './pagination-area';
import { FilterFn } from '@tanstack/react-table';
import { nameSearchFilter } from './filters/nameSearchFilter';
import { useSearchQueryStore } from '@/app/Hooks/useSearchQueryStore';
import { useState } from 'react';
import { useEffect } from 'react';
import { ColumnFiltersState } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
	interface FilterFns {
		nameSearchFilter: FilterFn<Patient>;
	}
}	

export type PagiantionType = {
	pageIndex: number;
	pageSize: number;
}

export default function PatientTable({
	patients,
	sorting: { sorting, setSorting },
}: {
	patients: Patient[] | null
	sorting: SortingProps;
}) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const { query } = useSearchQueryStore()

	const table = useReactTable({
		data: patients || [],
		columns,
		state: {
			sorting,
			columnFilters,
		},
		filterFns: {
			nameSearchFilter,
		},
		// pageCount: -1,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
	});

	useEffect(() => {
		const newFilters: ColumnFiltersState = []

		if (query) {
			newFilters.push({
				id: 'firstName',
				value: query,
			})
			newFilters.push({
				id: 'lastName',
				value: query,
			})
		}
		setColumnFilters(newFilters)
	}, [query])

	if (!patients) {
		return <SkeletonTable /> 
	}

	return (
		<div className="px-6 mt-5">
			<DataTable columns={columns} table={table} />
			 <PaginationArea table={table} /> 
		</div>
	)
}

function SkeletonTable() {
	return (
		<div className='space-y-4 p-9'>
			<div className='border rounded-lg'>
				<table className='w-full border-collapse'>
					<thead>
						<tr>
							{[
								"Select",
								"First Name",
								"Last Name",
								"Diagnosis",
								"Gender",
								"Appointment Date",
								"Last Visit",
								"Actions",
							].map((header, idx) => (
								<th key={idx} className='p-3 text-left'>
									<Skeleton className='h-4 w-3/4' />
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 5 }).map((_, rowIdx) => (
							<tr key={rowIdx} className='border-t'>
								{Array.from({ length: 8 }).map((_, colIdx) => (
									<td key={colIdx} className='p-3'>
										<Skeleton className='h-4 w-full' />
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}