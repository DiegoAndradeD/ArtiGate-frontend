/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import {
  generateDynamicTableDefaultColumns,
  createDynamicTableColumn,
  createDynamicTableActionColumn,
} from "../components/table/DynamicTableColumn";
import {
  RowType,
  SimpleColumn,
  TableColumn,
  CustomColumn,
  ActionColumn,
} from "../types/Table";
// Types
// Utils

interface Props<T extends RowType> {
  defaultColumns?: SimpleColumn<T>[];
  customColumns?: TableColumn<T>[];
  customActionColumn?: ActionColumn<T>;
}

const useDynamicTableColumns = <T extends RowType>({
  defaultColumns = [],
  customColumns = [],
  customActionColumn,
}: Props<T>): CustomColumn<T>[] => {
  return useMemo(() => {
    const baseColumns = generateDynamicTableDefaultColumns(defaultColumns);
    const actionColumn = customActionColumn
      ? createDynamicTableActionColumn(customActionColumn)
      : undefined;
    const complexColumns = customColumns.map(
      ({
        accessorKey,
        title,
        cell,
        isSorteable,
        customHeader,
        handleGlobalSort,
      }) =>
        createDynamicTableColumn<T>(
          accessorKey,
          title,
          cell,
          isSorteable,
          customHeader,
          handleGlobalSort
        )
    );

    return [
      ...baseColumns,
      ...complexColumns,
      ...(actionColumn ? [actionColumn] : []),
    ];
  }, [defaultColumns.length, customColumns.length, customActionColumn]);
};

export default useDynamicTableColumns;
