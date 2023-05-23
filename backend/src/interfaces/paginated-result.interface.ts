export interface PaginatedResult {
  data: {
    quote: string;
    votes: number;
    sort_by: 'votes';
    sort_order: 'desc';
  }[];
}
