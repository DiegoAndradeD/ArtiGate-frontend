"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
// Utils
import styleClassName from "../../utils/styleClassName";
// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setSelectedRows: (data: TData[]) => void;
  selectedRows: TData[];
  classNames?: {
    container?: string;
    table?: string;
    header?: string;
    head?: string;
    body?: string;
    border?: string;
    row?: string;
    cell?: string;
  };
}

const DynamicTable = <TData, TValue>({
  columns,
  data,
  setSelectedRows,
  selectedRows,
  classNames,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columnsWithSelection = useMemo(() => {
    return [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={() => table.toggleAllRowsSelected()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={() => row.toggleSelected()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      ...columns,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns.length]);

  const table = useReactTable({
    data,
    columns: columnsWithSelection,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const tableSelectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  useEffect(() => {
    if (setSelectedRows) {
      setSelectedRows(tableSelectedRows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableSelectedRows.length]);

  useEffect(() => {
    if (selectedRows && selectedRows.length === 0) {
      setRowSelection({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows?.length]);

  return (
    <section className={styleClassName(classNames?.container)}>
      <Table className={styleClassName(classNames?.table)}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className={styleClassName(
                classNames?.header,
                "border-b-2 border-gray-300 text-gray-700 bg-gray-100"
              )}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className={styleClassName(
                      classNames?.head,
                      "py-3 px-4 font-semibold text-sm text-left text-gray-600"
                    )}
                    key={header.id}
                  >
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

        <TableBody className={styleClassName(classNames?.body)}>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={styleClassName(
                  classNames?.row,
                  `transition-colors duration-200 ease-in-out ${
                    row.getIsSelected() ? "bg-blue-100" : "hover:bg-gray-50"
                  }`
                )}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className={styleClassName(
                      classNames?.cell,
                      "py-3 px-4 text-sm text-gray-700 border-b border-gray-200"
                    )}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={columnsWithSelection.length}
                className="h-24 text-center text-gray-500"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default DynamicTable;
