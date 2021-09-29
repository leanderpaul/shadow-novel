/**
 * Importing user defined packages.
 */
import { Novel, Genre, NovelType, NovelStatus } from './novel.model';
import { Chapter } from './chapter.model';

/**
 * Importing and defining types.
 */
import type { INovel, Volume } from './novel.model';
import type { IChapter } from './chapter.model';

/**
 * Defining the constants.
 */

/**
 * Exporting the modules types and objects
 */
export enum NovelSortField {
  TITLE = 'TITLE',
  CHAPTER_COUNT = 'CHAPTER_COUNT',
  VIEWS = 'VIEWS',
  CREATED_AT = 'CREATED_AT',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export { Novel, Genre, NovelType, Chapter, NovelStatus };
export type { INovel, Volume, IChapter };
