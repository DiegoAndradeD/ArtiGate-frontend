import { create } from "zustand";
import { toast } from "react-toastify";
import { Article } from "../types/Article";
import ArticleService from "../services/ArticleService";
import { handleErrorToast } from "../utils/handleErrorToast";
import { Pagination } from "../types/Pagination";

interface ArticleStore {
  articles: Article[];
  articlesPagination: Pagination;
  selectedArticle: Article | null;
  selectedArticles: Article[];
  isLoadingArticles: boolean;

  getArticles: () => Promise<void>;
  clearSelectedArticle: () => void;
  clearSelectedArticles: () => void;
  setSelectedArticle: (article: Article) => void;
  setSelectedArticles: (articles: Article[]) => void;
  setArticlesPagination: (
    filterState: keyof Pagination,
    value: Pagination[keyof Pagination]
  ) => void;
}

export const useArticleStore = create<ArticleStore>()((set, get) => ({
  articles: [],
  articlesPagination: {
    totalItems: 0,
    totalPages: 0,
    pageSize: 20,
    currentPage: 1,
  },
  selectedArticle: null,
  selectedArticles: [],
  isLoadingArticles: false,

  getArticles: async () => {
    set({ isLoadingArticles: true });
    try {
      const { articlesPagination } = get();
      const { items, pagination } = await ArticleService.getArticles(
        articlesPagination
      );
      set({ articles: items, articlesPagination: pagination });
      toast.success("Artigos carregados com sucesso.");
    } catch (error) {
      handleErrorToast("carregar artigos", error);
    } finally {
      set({ isLoadingArticles: false });
    }
  },

  setArticlesPagination: (
    filterState: keyof Pagination,
    value: Pagination[keyof Pagination]
  ): void => {
    set(({ articlesPagination }) => ({
      articlesPagination: {
        ...articlesPagination,
        [filterState]: value,
      },
    }));
  },

  clearSelectedArticle: () => set({ selectedArticle: null }),
  setSelectedArticle: (article: Article) => set({ selectedArticle: article }),

  clearSelectedArticles: () => set({ selectedArticles: [] }),
  setSelectedArticles: (articles: Article[]) =>
    set({ selectedArticles: articles }),
}));
