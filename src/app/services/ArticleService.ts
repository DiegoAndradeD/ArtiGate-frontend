import axios from "axios";
import { BASE_URL } from "../consts/apiUrl";
import { Pagination, PaginationResponse } from "../types/Pagination";
import { Article } from "../types/Article";

class ArticleService {
  static async getArticles(
    params: Pagination
  ): Promise<PaginationResponse<Article>> {
    const res = await axios.get(`${BASE_URL}/article`, {
      params,
    });
    return res.data;
  }
}
export default ArticleService;
