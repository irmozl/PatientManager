import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { useSelectedDiagnosesStore } from "../Hooks/useSelectedDiagnoses";
import { useSelectedGenderStore } from "@/app/Hooks/useGendersStore";
import { Badge } from "@/components/ui/badge";

export default function FilterArea() {
	const { selectedDiagnoses, setSelectedDiagnoses } = useSelectedDiagnosesStore()
	const { selectedGenders, setSelectedGenders } = useSelectedGenderStore()

	function resetFiltersFunction() {
		setSelectedDiagnoses([])
		setSelectedGenders([])
	}

	return (
		<div className="flex gap-3 px-6 mt-3">
			<FilteredGenders />
			<FilteredDiagnoses />

			{(selectedDiagnoses.length > 0 || selectedGenders.length > 0) && (
				<Button 
				onClick={resetFiltersFunction} 
				variant={"ghost"} 
				className="px-2 p-1"
				>
					<span>Reset</span>
					<IoClose />
				</Button>
			)}
		</div>
	)		
}

function FilteredGenders() {
	const { selectedGenders } = useSelectedGenderStore()
	return (
		<>
			{selectedGenders.length > 0 && (
				<div 
					key={selectedGenders.length}
					className="border-dashed border rounded-sm p-1 flex gap-2 items-center"
				>     
					<span className="text-gray-600">Gender</span>
					<Separator orientation="vertical" />

					<>
						{selectedGenders.map((gender,index) => (
							<div key={index} className="flex gap-2 items-center">
								<Badge variant={"secondary"}>{gender}</Badge>
							</div>
						))}
					</>
				</div>
			)}
		</>
	)
}

function FilteredDiagnoses() {
	const { selectedDiagnoses } = useSelectedDiagnosesStore()

	function ShowLessThanTwoItem() {
		if (selectedDiagnoses.length <= 2) {
			return (
				<>
					{selectedDiagnoses.map((diagnosis, index) => (
						<div key={index} className="flex gap-2 items-center">
							<Badge variant={"secondary"}>{diagnosis}</Badge>
						</div>
					))}
				</>
			)
		}

		return <Badge variant={"secondary"}>+{selectedDiagnoses.length - 2}</Badge>
	}

	return (
		<>
			{selectedDiagnoses.length > 0 && (
				<div 
					key={selectedDiagnoses.length}
					className="border-dashed border rounded-sm p-1 flex gap-2 items-center"
				>     
					<span className="text-gray-600">Diagnosis</span>
					<Separator orientation="vertical" />
					<ShowLessThanTwoItem />
				</div>
			)}
		</>
	)
}