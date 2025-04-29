import { create } from 'zustand';
import { Patient } from '@/app/data/patients-data'; 

interface PatientDataStore {
  patients: Patient[] | null;
  setPatients: (patientsProp: Patient[] | null) => void;
  fetchPatients: () => Promise<void>;
  addPatient: (newPatient: Patient) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  updatePatient: (id: string, updatedPatient: Partial<Patient>) => Promise<void>;
}

const usePatientDataStore = create<PatientDataStore>((set) => ({
  patients: null,
  setPatients: (patientsProp) => set({ patients: patientsProp }),
  
  fetchPatients: async () => {
    try {
      const response = await fetch('/api/patients');
      const data: Patient[] = await response.json();
      set({ patients: data });
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  },

  addPatient: async (newPatient) => {
    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatient),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add patient");
      }
  
      const savedPatient: Patient = await response.json();
  
      set((state) => ({
        patients: [...(state.patients || []), savedPatient],
      }));
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  },

  deletePatient: async (id) => {
    try {
      const response = await fetch(`/api/patients?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete patient");
      }

      set((state) => ({
        patients: (state.patients || []).filter(patient => patient.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting patient:", error);
      throw error; // Re-throw to allow handling in components
    }
  },

  updatePatient: async (id, updatedPatient) => {
    try {
      const response = await fetch(`/api/patients?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPatient),
      });

      if (!response.ok) {
        throw new Error("Failed to update patient");
      }

      set((state) => ({
        patients: (state.patients || []).map(patient => 
          patient.id === id ? { ...patient, ...updatedPatient } : patient
        ),
      }));
    } catch (error) {
      console.error("Error updating patient:", error);
      throw error; // Re-throw to allow handling in components
    }
  },
}));

export default usePatientDataStore;