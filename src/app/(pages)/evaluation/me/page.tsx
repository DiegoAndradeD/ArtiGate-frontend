"use client";

import DynamicTable from "@/app/components/table/DynamicTable";
/* eslint-disable react-hooks/exhaustive-deps */
import {
  articlesCustomTableColumn,
  articlesDefaultTableColumns,
} from "@/app/data/articles-table-columns";
import useDynamicTableColumns from "@/app/hooks/useDynamicTableColumns";
import { useArticleStore } from "@/app/stores/article.store";
import { useUserStore } from "@/app/stores/user.store";
import { Article } from "@/app/types/Article";
import { useEffect } from "react";

const UserArticles = () => {
  const { user } = useUserStore();
  const {
    getArticlesByUserId,
    articles,
    setSelectedArticles,
    selectedArticles,
  } = useArticleStore();

  const columns = useDynamicTableColumns<Article>({
    defaultColumns: articlesDefaultTableColumns,
    customColumns: articlesCustomTableColumn,
  });

  useEffect(() => {
    if (user?.id) {
      getArticlesByUserId(user.id);
    }
  }, [user?.id]);

  return (
    <section className="flex flex-col gap-4 mb-4 ">
      <DynamicTable
        columns={columns}
        data={articles}
        setSelectedRows={setSelectedArticles}
        selectedRows={selectedArticles}
      />
    </section>
  );
};
export default UserArticles;
