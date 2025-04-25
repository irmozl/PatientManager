import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { UpdatedPatient } from "./patients-cards-area";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function PatientCard({ singlePatient }: { singlePatient: UpdatedPatient }) {
	function renderGender(gender: "Female" | "Male" ){
		if (gender === "Male"){
			return <FaMale className="text-xl text-primary" />
		} else {
			return <FaFemale className="text-xl text-primary" />
		}
	}

	return (
		<Card className=" rounded-lg p-6 shadow-none" >
			<div className="flex gap-4 justify-between items-start">
				<div className="flex items-center gap-4">

					<div className="size-11 rounded-full bg-primary/15 flex-shrink-0 flex items-center justify-center">
						{renderGender(singlePatient.gender)}
					</div>

					<div className="flex-1">
						<p className="text-lg font-semibold cursor-pointer hover:text-primary">
							{singlePatient.firstName} {singlePatient.lastName}
						</p>
						<Badge className="text-[11px] font-normal bg-primary/20 shadow-none text-primary hover:bg-primary/20 select-none">
							{singlePatient.diagnosis}
						</Badge>
					</div>
				</div>
				<div className="flex gap-2 items-start">
					<button className="text-primary hover:text-primary/80">
						<FaEdit className="text-lg" />
					</button>
					<button className="text-red-500 hover:text-red-600">
						<MdDeleteForever className="text-xl" />
					</button>
				</div>
			</div>

			<ul className="text-sm text-gray-600 flex flex-col gap-3 pl-10">
				<li className="relative pl-5 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:h-2 ">
					<span className="font-smeibold">Appoint. Date:</span>
					<span>{singlePatient.appointmentDate}</span>
				</li>
				<li className="relative pl-5 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:h-2 ">
					<span className="font-semibold">Last Visit:</span>
					<span>{singlePatient.lastVisit}</span>
				</li>
			</ul>

		</Card>
	)
}