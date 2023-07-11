export type Range = {
  start: number;
  end: number;
}

export type Paginated<T> = Range & {
  total: number;
  data: T[];
}
