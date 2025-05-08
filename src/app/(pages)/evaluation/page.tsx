"use client";

import DynamicTable from "@/app/components/table/DynamicTable";
import {
  articlesCustomTableColumn,
  articlesDefaultTableColumns,
} from "@/app/data/articles-table-columns";
import { Modal } from "@/app/enums/Modal";
import useDynamicTableColumns from "@/app/hooks/useDynamicTableColumns";
/* eslint-disable react-hooks/exhaustive-deps */
import { useArticleStore } from "@/app/stores/article.store";
import useModalStore from "@/app/stores/modal.store";
import { Article } from "@/app/types/Article";
import { PaginationGroup } from "@/components/ui/pagination";
import { NotebookPen } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

const EvaluationPage = () => {
  const {
    getArticles,
    articles,
    setSelectedArticles,
    selectedArticles,
    setArticlesPagination,
    setSelectedArticle,
  } = useArticleStore();

  const articlesPagination = useArticleStore(
    useShallow((state) => state.articlesPagination)
  );

  const { toggleModal } = useModalStore();

  const columns = useDynamicTableColumns<Article>({
    defaultColumns: articlesDefaultTableColumns,
    customColumns: articlesCustomTableColumn,
    customActionColumn: {
      id: "article-actions",
      extraActions: (row) => {
        const actions = [
          {
            title: "Avaliar",
            icon: <NotebookPen className="text-black" />,
            onClick: () => {
              setSelectedArticle(row);
              toggleModal(Modal.EvaluateArticle);
            },
          },
        ];
        return actions;
      },
    },
  });

  useEffect(() => {
    getArticles();
  }, [articlesPagination]);

  const onPageChange = (page: number) => {
    setArticlesPagination("currentPage", page);
  };

  return (
    <section className="flex flex-col gap-4 mb-4 ">
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
