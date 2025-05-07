import { DBModelCount } from "./DbModelCount";
import { Review } from "./Review";
import { User } from "./User";

export interface Article {
  id: string;
  summary: string;
  scoreAvg: number;
  authors: {
    id: string;
    user: User;
    userId: string;
  }[];
  reviews: Review[];
  _count: DBModelCount;
}
