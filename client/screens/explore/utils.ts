/**
 * Importing npm packages.
 */
import { gql, useQuery } from '@apollo/client';

/**
 * Importing user defined packages.
 */
import { NovelSortField, SortOrder, Genre, NovelStatus, NovelType } from '../../graphql.types';

/**
 * Importing and defining types.
 */
import type { Novel, NovelSort } from '../../graphql.types';

export type SearchNovelsData = {
  novels: {
    totalCount: number;
    items: Pick<Novel, 'nid' | 'chapterCount' | 'cover' | 'genre' | 'status' | 'tags' | 'title' | 'views'>[];
  };
};

export interface SearchNovelsArgs {
  genre?: Genre;
  status?: NovelStatus;
  sort: NovelSort;
  type?: NovelType;
  limit: number;
  offset: number;
}

/**
 * Declaring the constants.
 */
const SEARCH_NOVELS = gql`
  query searchNovels($genre: Genre, $status: NovelStatus, $sort: NovelSort, $type: NovelType, $limit: Int, $offset: Int) {
    novels(genre: $genre, status: $status, type: $type, sort: $sort, limit: $limit, offset: $offset) {
      totalCount
      items {
        nid
        cover
        title
        genre
        status
        views
        chapterCount
        tags
      }
    }
  }
`;

export function useSearchNovels(query: Partial<Omit<SearchNovelsArgs, 'limit' | 'offset'>>) {
  const result = useQuery<SearchNovelsData, SearchNovelsArgs>(SEARCH_NOVELS, {
    variables: { offset: 0, limit: 20, sort: { field: NovelSortField.VIEWS, order: SortOrder.DESC }, ...query }
  });

  const loadMore = () => result.fetchMore({ variables: { offset: result.data?.novels.items.length } });
  // const hasMore = result.data != null ? result.data.items.length < result.data.totalCount : false;

  return { ...result, loadMore };
}

export const genres = Object.keys(Genre) as Genre[];
