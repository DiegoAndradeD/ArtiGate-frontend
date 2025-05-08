"use client";
import { Button } from "@/components/ui/button";
// Types
import {
  RowType,
  CellFunction,
  CustomColumn,
  ActionProps,
  SimpleColumn,
} from "../../types/Table";
// Components
import DynamicTableHeader from "./DynamicTableHeader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { JSX } from "react";
import { Ellipsis, PenLine, Trash2 } from "lucide-react";

export const generateDynamicTableDefaultColumns = <T extends RowType>(
  definitions: SimpleColumn<T>[],
  handleSort?: (key: keyof T) => void
): CustomColumn<T>[] => {
  return definitions.map(({ key, title, isSorteable = false }) =>
    createDynamicTableColumn<T>(
      key as string,
      title,
      ({ row }) => <span>{String(row.original[key] ?? "")}</span>,
      isSorteable,
      undefined,
      isSorteable && handleSort ? () => handleSort(key) : undefined
    )
  );
};

export const createDynamicTableColumn = <T extends RowType>(
  accessorKey: string,
  title: string,
  cell: CellFunction<T>,
  isSorteable?: boolean,
  customHeader?: React.ReactNode,
  handleGlobalSort?: () => void
): CustomColumn<T> => {
  return {
    accessorKey,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    header: ({ column }: any) => (
      <DynamicTableHeader
        column={column}
        title={title}
        isSorteable={isSorteable}
        extraHeaderContent={customHeader}
        handleGlobalSort={handleGlobalSort}
      />
    ),
    cell,
    isSorteable,
  };
};

export const createDynamicTableActionColumn = <T extends RowType>({
  id,
  onEdit,
  onDelete,
  customActionCell,
  extraActions,
}: {
  id: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  customActionCell?: (row: T) => JSX.Element;
  extraActions?: (row: T) => ActionProps<T>[];
}): CustomColumn<T> => {
  return {
    accessorKey: id,
    header: () => <span className="text-center font-bold">Ações</span>,
    cell: ({ row }: { row: { original: T; index: number } }) => {
      if (customActionCell) {
        return customActionCell(row.original);
      }

      const actions = extraActions?.(row.original) || [];

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={`p-2 h-auto rounded-lg bg-transparent hover:bg-gray-500`}
            >
              <Ellipsis width={20} height={20} className="text-black" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="start"
            sideOffset={10}
            className="!bg-white border-gray flex flex-col rounded-lg rounded-tr-none"
          >
            {actions.length > 0 &&
              actions.map((action, index) => (
                <Button
                  key={`${index}-${action.title}`}
                  icon={action.icon}
                  disabled={
                    action.isDisabled ? action.isDisabled(row.original) : false
                  }
                  isLoading={action.isLoading}
                  iconPlacement="left"
                  className="bg-transparent hover:bg-black/20 h-auto p-2 w-full justify-start border-none
                  border-transparent !shadow-none"
                  onClick={(e) => {
                    e.preventDefault();
                    action.onClick(row.original);
                  }}
                >
                  <h1 className="text-sm text-black">{action.title}</h1>
                </Button>
              ))}
            {onEdit && (
              <Button
                icon={<PenLine />}
                iconPlacement="left"
                className="bg-transparent hover:bg-gray/20 h-auto p-2 w-28 justify-start"
                onClick={(e) => {
                  e.preventDefault();
                  onEdit(row.original);
                }}
              >
                <h1 className="text-sm text-white/60">Editar</h1>
              </Button>
            )}
            {onDelete && (
              <Button
                icon={<Trash2 />}
                iconPlacement="left"
                className="bg-transparent hover:bg-gray/20 h-auto p-2 w-28 justify-start"
                onClick={(e) => {
                  e.preventDefault();
                  if (onDelete) {
                    onDelete(row.original);
                  }
                }}
              >
                <h1 className="text-sm text-white/60">Excluir</h1>
              </Button>
            )}
          </PopoverContent>
        </Popover>
      );
    },
  };
};
