import { create } from "zustand";
import { toast } from "react-toastify";
import { ReviewFormData } from "../schemas/evaluate-article-schema";
import ReviewService from "../services/ReviewService";
import ErrorService from "../services/ErrorService";

interface ReviewStore {
  submitReview: (data: ReviewFormData) => Promise<void>;
}

export const useReviewStore = create<ReviewStore>()(() => ({
  submitReview: async (data: ReviewFormData) => {
    try {
      await ReviewService.evaluateArticle(data);
      toast.success("Avaliação enviada com sucesso.");
    } catch (error) {
      ErrorService.httpErrorHandler(error);
      throw error;
    }
  },
}));
