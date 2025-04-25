import { Patient } from "@/app/data/patients-data";
import { useState } from "react";
import PatientCard from "./patient-card";
import { Skeleton } from "@/components/ui/skeleton"
import { SortingProps } from "@/app/page";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnSort } from "@tanstack/react-table";

export type UpdatedPatient = Patient & { patientIndex: number }

export default function PatientCardArea({ 
	patients,
	sorting: { sorting, setSorting}, 
}: { 
	patients: Patient[] | null;
	sorting: SortingProps;
 }) {
	const [updatedPatients] = useState<UpdatedPatient[]>(() => {
		if (patients) {
	     	return patients.map((patient, index) => ({
				...patient,
				patientIndex: index,
			}));
		}
		return [];
	})

	if(!patients) {
		return <SkeletonCard/>
	}

	const sortedPatients = sortPatients(
		updatedPatients,
		sorting[0] || { id: "firstName", desc: false }
	)

	function RenderSortingTag(){
		return (
			<div className="border-dashed border rounded-sm p-1 mt-4 flex gap-2 items-center px-2 text-sm w-fit">
				<span className="text-gray-600">Sorted By</span>
				<Separator orientation="vertical" />
				<div className="flex gap-2 items-center">
					<Badge variant={"secondary"}>{sorting[0].id}</Badge> 
				</div>
				<Button onClick={() => setSorting([])} variant={"link"}>
					Reset
				</Button>
			</div>
		)
	}

	return (
		<div className="px-6 pb-5">
			{sorting.length > 0 && <RenderSortingTag />}
			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 mb-8 gap-4">
				{sortedPatients.map((singlePatient, index) => (
					<PatientCard key={index} singlePatient={singlePatient} />
				))}
			</div>
		</div>
	)
 }

const sortPatients = (
	patients: UpdatedPatient[],
	sortConfig: ColumnSort
) : UpdatedPatient[] => {
	if (!sortConfig.id) return patients;

	return [...patients].sort((a, b) => {
		const aValue = a[sortConfig.id as keyof Patient];
		const bValue = b[sortConfig.id as keyof Patient];

		if (aValue === null || aValue === undefined)
			return sortConfig.desc ? 1 : -1;
		if (bValue === null || bValue === undefined)
			return sortConfig.desc ? -1 : 1;

		if (sortConfig.id === "appointmentDate" || sortConfig.id === "lastVisit") {
			const aDate = new Date(aValue as string).getTime();
			const bDate = new Date(bValue as string).getTime();
			return sortConfig.desc ? bDate - aDate : aDate - bDate;
		}

		if (typeof aValue === "string" && typeof bValue === "string") {
			return sortConfig.desc
				? bValue.localeCompare(aValue)
				: aValue.localeCompare(bValue);
		}

		return sortConfig.desc
		? Number(bValue) - Number(aValue)
		: Number(aValue) - Number(bValue);
	});

}




 export function SkeletonCard() {
	return (
	  <div className="">
		{[...Array(1)].map((_, index) => (
      <div key={index} className="">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      </div>
    ))}
	  </div>
	)
  }