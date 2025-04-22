"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandInput,
  } from "@/components/ui/command"
  import {
	Popover,
	PopoverContent,
	PopoverTrigger,
  } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { LuGitPullRequestDraft } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox"
import  usePatientDataStore  from "@/app/Hooks/usePatientDataStore";
import { useSelectedDiagnosesStore } from "@/app/Hooks/useSelectedDiagnoses";

const diagnoses = [
	{ value: "Diabetes", label: "Diabetes" },
	{ value: "Hypertension", label:"Hypertension"},
	{ value: "Heart Disease", label:"Heart Disease"},
	{ value: "Arthritis", label:"Arthritis"},
	{ value: "Allergies", label:"Allergies"},
	{ value: "Asthma", label:"Asthma"},
]

export function DiagnosesDropdown() {
	const [open, setOpen] = React.useState(false)

	const { selectedDiagnoses, setSelectedDiagnoses } = useSelectedDiagnosesStore()
	const { patients } = usePatientDataStore()

	function updateSelectedDiagnoses (diagnosis: string) {
		const isDiagnosisIncluded = selectedDiagnoses.includes(diagnosis)

		if (isDiagnosisIncluded) {
			setSelectedDiagnoses(selectedDiagnoses.filter((d) => d !== diagnosis))
		} else {
			setSelectedDiagnoses([...selectedDiagnoses,diagnosis])
		}
	}

	function calculateDiagnosesNumber (value: string) {
		if (patients) {
			switch (value) {
				case "Hypertension":
					return patients.filter((patient) => patient.diagnosis === "Hypertension").length;
				case "Diabetes":
					return patients.filter((patient) => patient.diagnosis === "Diabetes").length;
				case "Heart Disease":
					return patients.filter((patient) => patient.diagnosis === "Heart Disease").length;
				case "Arthritis":
					return patients.filter((patient) => patient.diagnosis === "Arthritis").length;
				case "Allergies":
					return patients.filter((patient) => patient.diagnosis === "Allergies").length;
				case "Asthma":
					return patients.filter((patient) => patient.diagnosis === "Asthma").length;
			}
		}
				
		return 0;
	}

	return (
		<div className="flex items-center space-x-4">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button className="h-10" variant={"outline"}>
						<LuGitPullRequestDraft />
						 Diagnoses
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-56 p-0" align="end" side="bottom">
					<Command className="p-1">
						<CommandInput placeholder="Search Diagnoses" />
						<CommandList>
							<CommandEmpty className="text-slate-500 text-sm text-center p-5">No diagnoses found.</CommandEmpty>
							<CommandGroup>
								{diagnoses.map((diagnosis) => (
									<CommandItem 
									onSelect={() => updateSelectedDiagnoses(diagnosis.value)}
									className="h-9"
									key={diagnosis.value}
									>
										<Checkbox
										checked={selectedDiagnoses.includes(diagnosis.value)}
										className="size-4 rounded-[4px]"
										/>
										<div className={`flex items-center justify-between w-full gap-1 p-1 rounded-lg px-3 text-[14px]`}>
											<span> {diagnosis.label} </span>
											<span className="font-medium text-primary"> {calculateDiagnosesNumber(diagnosis.value)} </span>
										</div>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
						
						<div className="flex flex-col gap-2 text-[23px]">
							<Separator />
							<Button 
							onClick={() => setSelectedDiagnoses([])}
							variant={"ghost"}
							className="text-[12px] mb-1">
								Clear All
							</Button>
						</div>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}