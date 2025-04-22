"use client";

import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Patient } from "@/app/data/patients-data";
import { useTheme } from "next-themes";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: ReactTable<Patient>;
}

export function DataTable<TData extends Patient, TValue>({
  columns,
  table,
}: DataTableProps<TData, TValue>) {
  const { theme } = useTheme();

  function darkColorSwitcher(i: number) {
    if (theme === "light") {
      if (i % 2 === 0) {
        return "bg-white hover:bg-gray-100";
      } else {
        return "bg-gray-50 hover:bg-gray-100";
      }
    } else {
      return "bg-transparent";
    }
  }

  return (
    <div className="rounded-md border-x border-t">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row,i) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`group border-none transition-colors py-4 ${darkColorSwitcher(i)}`} >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
