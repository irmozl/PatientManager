import { Patient } from "@/app/data/patients-data";
import { FilterFn } from "@tanstack/react-table";

export const nameSearchFilter: FilterFn<Patient> = (
	row, 
	columnId, 
	filterValue
) => {
  const firstName: string  = row.getValue("firstName") || "";
  const lastName: string = row.getValue("lastName") || "";
  const query = String(filterValue).toLowerCase().trim();

  return (
	firstName.toLowerCase().includes(query) ||
	lastName.toLowerCase().includes(query)
  )
}