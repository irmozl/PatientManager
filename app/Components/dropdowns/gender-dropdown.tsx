"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
  } from "@/components/ui/command"
  import {
	Popover,
	PopoverContent,
	PopoverTrigger,
  } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { LuGitPullRequestDraft } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox"
import { useSelectedGenderStore } from "@/app/Hooks/useGendersStore";
import usePatientDataStore from "@/app/Hooks/usePatientDataStore";


const genders = [
	{ value: "Male", label: "Male" },
	{ value: "Female", label:"Female"}
]
 
export function GenderDropdown() {
	const [open, setOpen] = React.useState(false)
	const { patients } = usePatientDataStore()

	function renderGenderNumber(gender: string) {
		const numberMalePatient = patients
		? patients?.filter((patient) => patient.gender === "Male").length
		: 0
		const numberFemalePatient = patients
		? patients.length - numberMalePatient
		: 0

		if (gender === "Male") {
			return numberMalePatient
		} else {
			return numberFemalePatient
		}
	}

	const { selectedGenders, setSelectedGenders } = useSelectedGenderStore()

	console.log("selectedGenders", selectedGenders)

	function toggleGenders (gender: string) {
		const isGenderIncluded = selectedGenders.includes(gender)

		if (isGenderIncluded) {
			setSelectedGenders(selectedGenders.filter((g) => g !== gender))
		} else {
			setSelectedGenders([...selectedGenders,gender])
		}
	}

	return (
		<div className="flex items-center space-x-4">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button className="h-10" variant={"outline"}>
						<LuGitPullRequestDraft />
						 Genders
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-44 p-0" align="end" side="bottom">
					<Command className="p-1">
						<CommandList>
							<CommandEmpty className="text-slate-500 text-sm text-center p-5">No gender found.</CommandEmpty>
							<CommandGroup>
								{genders.map((gender) => (
									<CommandItem 
									onSelect={() => toggleGenders(gender.value)}
									className="h-9"
									key={gender.value}
									>
										<Checkbox
										checked={selectedGenders.includes(gender.value)}
										className="size-4 rounded-[4px]"
										/>
										<div className={`flex items-center justify-between w-full gap-1 p-1 rounded-lg px-3 text-[14px]`}>
											<span> {gender.label} </span>
											<span className="font-bold text-primary"> {renderGenderNumber(gender.value)} </span>
										</div>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
						<div className="flex flex-col gap-2 text-[23px]">
							<Separator />
							<Button 
							onClick={() => setSelectedGenders([])}
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
