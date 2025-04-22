import { create } from 'zustand';

export type CurrentViewOption = "grid" | "list"

type PatientViewStore = {
    currentView: CurrentViewOption
    updateCurrentView: (currentViewProp: CurrentViewOption) => void
}

export const usePatientViewStore = create<PatientViewStore>((set) => {
    return {
        currentView: "list",
        updateCurrentView: (currentViewProp) => set({currentView: currentViewProp})
    }
})