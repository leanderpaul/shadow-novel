/**
 * Importing npm packages.
 */
import { gql, useQuery } from '@apollo/client';

/**
 * Importing user defined packages.
 */
import { NovelSortField, SortOrder, Genre } from '../../graphql.types';

/**
 * Importing and defining types.
 */
import type { Novel, NovelSort } from '../../graphql.types';

type NovelGenresData = {
  [key in Genre]: {
    items: Pick<Novel, 'nid' | 'title' | 'cover'>[];
  };
};

interface NovelGenresArgs {
  limit: number;
  sort: NovelSort;
}

/**
 * Declaring the constants.
 */
const LIST_NOVELS_BY_GENRE = gql`
  query ListNovelsByGenre($limit: Int, $sort: NovelSort) {
    ${Genre.CONTEMPORARY_ROMANCE}: novels(genre: CONTEMPORARY_ROMANCE, limit: $limit, sort: $sort) {
      ...NovelCardInfo
    }
    ${Genre.EASTERN_FANTASY}: novels(genre: EASTERN_FANTASY, limit: $limit, sort: $sort) {
      ...NovelCardInfo
    }
    ${Genre.MAGICAL_REALISM}: novels(genre: MAGICAL_REALISM, limit: $limit, sort: $sort) {
      ...NovelCardInfo
    }
    ${Genre.SCIENCE_FICTION}: novels(genre: SCIENCE_FICTION, limit: $limit, sort: $sort) {
      ...NovelCardInfo
    }
    ${Genre.VIDEO_GAMES}: novels(genre: VIDEO_GAMES, limit: $limit, sort: $sort) {
      ...NovelCardInfo
    }
    ${Genre.WESTERN_FANTASY}: novels(genre: WESTERN_FANTASY, limit: $limit, sort: $sort) {
      ...NovelCardInfo
    }
  }

  fragment NovelCardInfo on NovelPagination {
    items {
      nid
      title
      cover
    }
  }
`;

export const useListNovelsByGenre = () =>
  useQuery<NovelGenresData, NovelGenresArgs>(LIST_NOVELS_BY_GENRE, { variables: { limit: 10, sort: { field: NovelSortField.VIEWS, order: SortOrder.DESC } } });

export const genres = Object.keys(Genre) as Genre[];
