export interface PaginatedResult {
  data: {
    quote: string;
    votes: number;
    sort_by: 'votes';
    sort_order: 'desc';
  }[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}
