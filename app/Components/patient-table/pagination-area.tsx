import { Button } from "@/components/ui/button";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { useTheme } from "next-themes";
import PaginationSelection from "./pagination-selection";

interface TableType {
  getState: () => { pagination: { pageIndex: number } };
  getPageCount: () => number;
  setPageIndex: (index: number) => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  previousPage: () => void;
  nextPage: () => void;
}

export default function PaginationArea({ table }: { table: TableType }) {
	const { theme } = useTheme();

	const bgColor = theme === "dark" ? "bg-black border-t" : "bg-white";

	const { pageIndex } = table.getState().pagination;

	return (
		<div className={`sm:flex items-center justify-between px-3 py-4 sm:py-5 sm:px-6 ${bgColor} relative border rounded-b-lg w-full h-full`}>
			<PaginationSelection/>
			<div className="flex items-center gap-6 sm:mt-0 mt-3 ">
				<span className="sm:text-sm text-xs  text-gray-500">
					Page {pageIndex + 1} of {table.getPageCount()}
				</span>
				<div className="flex items-center justify-end space-x-2">
					<Button 
						variant="outline"
						className="size-9 w-12"
						size="sm"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<BiFirstPage />
					</Button>
					<Button
						variant="outline"
						className="size-9 w-12"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<GrFormPrevious />
					</Button>
					<Button
						variant="outline"
						className="size-9 w-12"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<GrFormNext />
					</Button>
					<Button 
						variant="outline"
						className="size-9 w-12"
						size="sm"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<BiLastPage />
					</Button>
				</div>
			</div>
		</div>
	)

}