import axios from "axios";
import { BASE_URL } from "../consts/apiUrl";
import { Pagination, PaginationResponse } from "../types/Pagination";
import { Article } from "../types/Article";
import { SubmissionFormData } from "../schemas/submission-schema";

class ArticleService {
  static async getArticles(
    params: Pagination
  ): Promise<PaginationResponse<Article>> {
    const res = await axios.get(`${BASE_URL}/article`, {
      params,
    });
    return res.data;
  }
  static async submitArticle(data: SubmissionFormData): Promise<Article> {
    const res = await axios.post(`${BASE_URL}/article`, data);
    return res.data;
  }
}
export default ArticleService;
