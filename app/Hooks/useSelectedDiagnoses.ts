import { create } from 'zustand';

interface FilterStoreInterface {
	selectedDiagnoses : string[]
	setSelectedDiagnoses: (diagnoses: string[]) => void
}

export const useSelectedDiagnosesStore = create<FilterStoreInterface>((set) => ({
	selectedDiagnoses: [],
	setSelectedDiagnoses: (diagnoses) => set({ selectedDiagnoses: diagnoses}),
}))