import type { SortOrder } from './models';

export interface PageInfo {
  offset: number;
  limit: number;
}

export interface Sort<T extends string> {
  field: T;
  order: SortOrder;
}
