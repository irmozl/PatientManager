import { nanoid } from 'nanoid';

export type Diagnosis = 
  | "Hypertension" 
  | "Diabetes" 
  | "Asthma" 
  | "Heart Disease" 
  | "Arthritis" 
  | "Allergies";

export interface Patient {
	id: string;
	firstName: string;
	lastName: string;
	diagnosis: Diagnosis;
	gender: "Male" | "Female";
	appointmentDate: string;
	lastVisit: string;
}

export const patients: Patient[] = [
	{
		id: nanoid(),
		firstName: "John",
		lastName: "Doe",
		diagnosis: "Hypertension",
		gender: "Male",
		appointmentDate: "2025-04-03",
		lastVisit: "2025-03-01",
	},
	{
		id: nanoid(),
		firstName: "Alice",
		lastName: "Johnson",
		diagnosis: "Diabetes",
		gender: "Female",
		appointmentDate: "2025-04-05",
		lastVisit: "2025-03-10",
	},
	{
		id: nanoid(),
		firstName: "Michael",
		lastName: "Smith",
		diagnosis: "Asthma",
		gender: "Male",
		appointmentDate: "2025-04-07",
		lastVisit: "2025-02-25",
	},
	{
		id: nanoid(),
		firstName: "Emma",
		lastName: "Williams",
		diagnosis: "Allergies",
		gender: "Female",
		appointmentDate: "2025-04-10",
		lastVisit: "2025-03-15",
	},
	{
		id: nanoid(),
		firstName: "James",
		lastName: "Brown",
		diagnosis: "Arthritis",
		gender: "Male",
		appointmentDate: "2025-04-12",
		lastVisit: "2025-03-05",
	},
	{
		id: nanoid(),
		firstName: "Sophia",
		lastName: "Davis",
		diagnosis: "Arthritis",
		gender: "Female",
		appointmentDate: "2025-04-15",
		lastVisit: "2025-02-28",
	},
	{
		id: nanoid(),
		firstName: "Daniel",
		lastName: "Miller",
		diagnosis: "Heart Disease",
		gender: "Male",
		appointmentDate: "2025-04-18",
		lastVisit: "2025-03-08",
	},
	{
		id: nanoid(),
		firstName: "Olivia",
		lastName: "Garcia",
		diagnosis: "Heart Disease",
		gender: "Female",
		appointmentDate: "2025-04-20",
		lastVisit: "2025-03-12",
	},
	{
		id: nanoid(),
		firstName: "Ethan",
		lastName: "Martinez",
		diagnosis: "Heart Disease",
		gender: "Male",
		appointmentDate: "2025-04-22",
		lastVisit: "2025-02-20",
	},
	{
		id: nanoid(),
		firstName: "Ava",
		lastName: "Rodriguez",
		diagnosis: "Asthma",
		gender: "Female",
		appointmentDate: "2025-04-25",
		lastVisit: "2025-03-02",
	},
	{
		id: nanoid(),
		firstName: "William",
		lastName: "Lee",
		diagnosis: "Asthma",
		gender: "Male",
		appointmentDate: "2025-04-28",
		lastVisit: "2025-03-18",
	},
	{
		id: nanoid(),
		firstName: "Daniel",
		lastName: "Miller",
		diagnosis: "Heart Disease",
		gender: "Male",
		appointmentDate: "2025-04-18",
		lastVisit: "2025-03-08",
	},
	{
		id: nanoid(),
		firstName: "Olivia",
		lastName: "Garcia",
		diagnosis: "Heart Disease",
		gender: "Female",
		appointmentDate: "2025-04-20",
		lastVisit: "2025-03-12",
	},
	{
		id: nanoid(),
		firstName: "Ethan",
		lastName: "Martinez",
		diagnosis: "Heart Disease",
		gender: "Male",
		appointmentDate: "2025-04-22",
		lastVisit: "2025-02-20",
	},
	{
		id: nanoid(),
		firstName: "Ava",
		lastName: "Rodriguez",
		diagnosis: "Asthma",
		gender: "Female",
		appointmentDate: "2025-04-25",
		lastVisit: "2025-03-02",
	},
	{
		id: nanoid(),
		firstName: "William",
		lastName: "Lee",
		diagnosis: "Asthma",
		gender: "Male",
		appointmentDate: "2025-04-28",
		lastVisit: "2025-03-18",
	},
]