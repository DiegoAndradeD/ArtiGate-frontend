export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
export interface PaginationResponse<T> {
  items: T[];
  pagination: Pagination;
}
