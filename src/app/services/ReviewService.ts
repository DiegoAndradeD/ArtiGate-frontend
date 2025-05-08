import axios from "axios";
import { BASE_URL } from "../consts/apiUrl";
import { Review } from "../types/Review";
import { ReviewFormData } from "../schemas/evaluate-article-schema";

class ReviewService {
  static async evaluateArticle(data: ReviewFormData): Promise<Review> {
    const res = await axios.post(`${BASE_URL}/review`, data);
    return res.data;
  }
}
export default ReviewService;
