import { create } from 'zustand';
import { patients } from '@/app/data/patients-data';
import { Patient } from '@/app/data/patients-data';

interface PatientDataStore {
  patients: Patient[] | null;
  setPatients: (patientsProp: Patient[] | null) => void;
  fetchPatients: () => Promise<void>;
  addPatient: (newPatient: Patient) => Promise<void>;
}

const usePatientDataStore = create<PatientDataStore>((set, get) => ({
	patients: null,
	setPatients: (patientsProp) => set({ patients: patientsProp }),
	fetchPatients: async () => {
		try {
			const data = await new Promise<Patient[]>((resolve) =>
				setTimeout(() => resolve(patients), 690)
		);

			set({ patients: data });
		} catch (error) {
			console.error("Failed to fetch patients:", error);
		}
	},
	addPatient: async (newPatient) => {
		try {
			await new Promise<void>((resolve) =>
				setTimeout(() => {
					const currentPatients = get().patients || [];
					const updatedPatients = [...currentPatients, newPatient];
					set({ patients: updatedPatients });
					resolve();
				}, 450)
		);
		} catch (error) {
			console.log("Failed to add patient:", error);
		}
	},
}));

export default usePatientDataStore;