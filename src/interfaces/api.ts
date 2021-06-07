export interface ApiResponse<T> {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
}

export type ApiResponseArray<T> = ApiResponse<T[]>;

export type Sort = 'DESC' | 'ASC';
