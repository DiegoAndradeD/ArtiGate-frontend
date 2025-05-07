import { User } from "./User";

export interface Review {
  id: string;
  articleId: string;
  reviewer: User;
  score: number;
  commentary: string;
}
