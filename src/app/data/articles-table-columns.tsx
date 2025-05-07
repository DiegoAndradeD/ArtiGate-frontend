import { Article } from "../types/Article";
import { SimpleColumn, TableColumn } from "../types/Table";

export const articlesCustomTableColumn: TableColumn<Article>[] = [
  {
    title: "Autores",
    accessorKey: "authors",
    cell: ({ row }) => (
      <span>
        {row.original.authors?.map((author) => author.user?.name).join(", ") ||
          "-"}
      </span>
    ),
    isSorteable: false,
  },
  {
    title: "Resumo",
    accessorKey: "summary",
    cell: ({ row }) => (
      <span className="w-[400px] truncate ...">{row.original.summary}</span>
    ),
    isSorteable: false,
  },
  {
    title: "Número de revisões",
    accessorKey: "_count",
    cell: ({ row }) => (
      <span className="w-[400px] truncate ...">
        {row.original._count.reviews}
      </span>
    ),
    isSorteable: false,
  },
];

export const articlesDefaultTableColumns: SimpleColumn<Article>[] = [
  { key: "scoreAvg", title: "Média de avaliação", isSorteable: false },
];
