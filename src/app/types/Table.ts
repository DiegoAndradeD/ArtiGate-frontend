/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from "react";

export interface RowType {
  [key: string]: any;
}

export type CellFunction<T> = (props: {
  row: { original: T; index: number };
}) => JSX.Element;

export interface TableColumn<T> {
  accessorKey: string;
  title: string;
  cell: CellFunction<T>;
  isSorteable?: boolean;
  customHeader?: JSX.Element;
  handleGlobalSort?: () => void;
}
export interface CustomColumn<T> {
  accessorKey: string;
  header: (props: { column: any }) => JSX.Element | null;
  cell: CellFunction<T>;
  isSorteable?: boolean;
}

export interface ActionProps<T> {
  title: string;
  icon: React.ReactNode;
  onClick: (row: T) => void;
  isDisabled?: (row: T) => boolean;
  isLoading?: boolean;
}

export interface SimpleColumn<T> {
  key: keyof T;
  title: string;
  isSorteable?: boolean;
}

export interface ActionColumn<T> {
  id: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  customActionCell?: (row: T) => JSX.Element;
  extraActions?: (row: T) => ActionProps<T>[];
}
