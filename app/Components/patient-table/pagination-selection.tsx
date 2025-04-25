import { 
	Select, 
	SelectContent, 
	SelectItem, 
	SelectTrigger, 
	SelectValue
} from "@/components/ui/select"

export default function PaginationSelection() {
	return (
		<div className="flex items-center gap-2">
			<span className="sm:text-sm text-xs text-gray-500">Rows Per Page</span>
			<Select >
				<SelectTrigger className="w-[90px]">
					<SelectValue placeholder="4" />
				</SelectTrigger>
				<SelectContent>
					{[4, 6, 8, 10, 15, 20, 30].map((item) => (
						<SelectItem key={item} value={item.toString()}>
							{item}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}