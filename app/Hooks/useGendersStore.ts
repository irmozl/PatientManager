import { create } from 'zustand';

interface FilterStoreInterface {
    selectedGenders: string[]
    setSelectedGenders: (genders: string[]) => void 
}

export const useSelectedGenderStore = create<FilterStoreInterface>((set) => ({
    selectedGenders: [],
    setSelectedGenders: (genders) => set({ selectedGenders: genders}),
}))

