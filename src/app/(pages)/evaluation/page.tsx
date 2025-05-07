"use client";

import DynamicTable from "@/app/components/table/DynamicTable";
import {
  articlesCustomTableColumn,
  articlesDefaultTableColumns,
} from "@/app/data/articles-table-columns";
import useDynamicTableColumns from "@/app/hooks/useDynamicTableColumns";
/* eslint-disable react-hooks/exhaustive-deps */
import { useArticleStore } from "@/app/stores/article.store";
import { Article } from "@/app/types/Article";
import { PaginationGroup } from "@/components/ui/pagination";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

const EvaluationPage = () => {
  const {
    getArticles,
    articles,
    setSelectedArticles,
    selectedArticles,
    setArticlesPagination,
  } = useArticleStore();

  const articlesPagination = useArticleStore(
    useShallow((state) => state.articlesPagination)
  );

  const columns = useDynamicTableColumns<Article>({
    defaultColumns: articlesDefaultTableColumns,
    customColumns: articlesCustomTableColumn,
  });

  useEffect(() => {
    getArticles();
  }, [articlesPagination]);

  console.log("articles", articles);

  const onPageChange = (page: number) => {
    setArticlesPagination("currentPage", page);
  };

  return (
    <section className="flex flex-col gap-4 mb-4">
      <DynamicTable
        columns={columns}
        data={articles}
        setSelectedRows={setSelectedArticles}
        selectedRows={selectedArticles}
      />
      <PaginationGroup
        totalPages={articlesPagination.totalPages}
        currentPage={articlesPagination.currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
};
export default EvaluationPage;
