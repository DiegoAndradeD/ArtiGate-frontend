import { create } from "zustand";
import { toast } from "react-toastify";
import { Article } from "../types/Article";
import ArticleService from "../services/ArticleService";
import { Pagination } from "../types/Pagination";
import { SubmissionFormData } from "../schemas/submission-schema";
import ErrorService from "../services/ErrorService";

interface ArticleStore {
  articles: Article[];
  articlesPagination: Pagination;
  selectedArticle: Article | null;
  selectedArticles: Article[];
  isLoadingArticles: boolean;
  isLoadingArticleSubmission: boolean;

  getArticles: () => Promise<void>;
  clearSelectedArticle: () => void;
  clearSelectedArticles: () => void;
  setSelectedArticle: (article: Article) => void;
  setSelectedArticles: (articles: Article[]) => void;
  setArticlesPagination: (
    filterState: keyof Pagination,
    value: Pagination[keyof Pagination]
  ) => void;
  submitArticle: (data: SubmissionFormData) => Promise<void>;
  getArticlesByUserId: (userId: string) => Promise<void>;
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
  isLoadingArticleSubmission: false,

  getArticles: async () => {
    set({ isLoadingArticles: true });
    try {
      const { articlesPagination } = get();
      const { items, pagination } = await ArticleService.getArticles(
        articlesPagination
      );
      set({ articles: items, articlesPagination: pagination });
    } catch (error) {
      ErrorService.httpErrorHandler(error);
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
  submitArticle: async (data: SubmissionFormData) => {
    set({ isLoadingArticleSubmission: true });
    try {
      await ArticleService.submitArticle(data);
      toast.success("Artigo submetido com sucesso.");
    } catch (error) {
      ErrorService.httpErrorHandler(error);
      throw error;
    } finally {
      set({ isLoadingArticleSubmission: false });
    }
  },
  getArticlesByUserId: async (userId: string) => {
    set({ isLoadingArticles: true });
    try {
      const articles = await ArticleService.getArticlesByUserId(userId);
      set({ articles });
    } catch (error) {
      ErrorService.httpErrorHandler(error);
    } finally {
      set({ isLoadingArticles: false });
    }
  },
}));
