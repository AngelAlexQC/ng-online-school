export interface Paginated {
  data: any[];
  links: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string;
      label: string;
      active: string;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
