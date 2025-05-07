/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import {
  generateDynamicTableDefaultColumns,
  createDynamicTableColumn,
} from "../components/table/DynamicTableColumn";
import {
  RowType,
  SimpleColumn,
  TableColumn,
  CustomColumn,
} from "../types/Table";
// Types
// Utils

interface Props<T extends RowType> {
  defaultColumns?: SimpleColumn<T>[];
  customColumns?: TableColumn<T>[];
}

const useDynamicTableColumns = <T extends RowType>({
  defaultColumns = [],
  customColumns = [],
}: Props<T>): CustomColumn<T>[] => {
  return useMemo(() => {
    const baseColumns = generateDynamicTableDefaultColumns(defaultColumns);

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

    return [...baseColumns, ...complexColumns];
  }, [defaultColumns.length, customColumns.length]);
};

export default useDynamicTableColumns;
