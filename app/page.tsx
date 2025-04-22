"use client";

import { useTheme } from "next-themes";
import Navbar from "./Components/navbar";
import StatisticCards  from "./Components/statistics-cards";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import usePatientDataStore from "./Hooks/usePatientDataStore";
import FilterArea from "./Components/filter-area";
import SummaryAndButtonsArea from "./Components/filter-and-summaryArea";
import { usePatientViewStore } from "./Hooks/usePatientViewStore";
import PatientTable from "./Components/patient-table/patient-table";
import PatientCardArea from "./Components/patients-cards-area/patients-cards-area";
import { SortingState } from "@tanstack/react-table";

export interface SortingProps {
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>
}

export default function Home() {
  const { theme } = useTheme();
  const { fetchPatients, patients } = usePatientDataStore()
  const { currentView } = usePatientViewStore()
  const [ sorting, setSorting ] = useState<SortingState>([])

  const bgColor = theme === "dark" ? "bg-black/60" : "bg-slate-100";

  useEffect(() => {
    fetchPatients()
  }, [])

  function RenderCurrentView() {
    switch (currentView) {
      case "grid":
        return <PatientCardArea patients={patients} sorting={{sorting,setSorting}} />;
      case "list":
        return <PatientTable patients={patients} sorting={{sorting, setSorting }} />;
    }
  }

  
  return (
    <div className={`relative min-h-screen ${bgColor}`}>
      <Navbar />
      <StatisticCards />
      <SummaryAndButtonsArea />   
      <FilterArea />
      <RenderCurrentView/>
    </div>
  );
}
