export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Chapter = {
  __typename?: 'Chapter';
  content: Array<Scalars['String']>;
  createdAt: Scalars['Date'];
  index: Scalars['Int'];
  nid: Scalars['ID'];
  title: Scalars['String'];
};

export enum Genre {
  CONTEMPORARY_ROMANCE = 'CONTEMPORARY_ROMANCE',
  EASTERN_FANTASY = 'EASTERN_FANTASY',
  MAGICAL_REALISM = 'MAGICAL_REALISM',
  SCIENCE_FICTION = 'SCIENCE_FICTION',
  VIDEO_GAMES = 'VIDEO_GAMES',
  WESTERN_FANTASY = 'WESTERN_FANTASY'
}

export type Novel = {
  __typename?: 'Novel';
  author: Scalars['String'];
  chapter?: Maybe<Chapter>;
  chapterCount: Scalars['Int'];
  chapters: Array<Chapter>;
  cover?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  genre: Genre;
  nid: Scalars['ID'];
  status: NovelStatus;
  summary: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  type: NovelType;
  views: Scalars['Int'];
  volumes?: Maybe<Array<Volume>>;
};


export type NovelChapterArgs = {
  index: Scalars['Int'];
};

export type NovelPagination = {
  __typename?: 'NovelPagination';
  items: Array<Novel>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NovelSort = {
  field: NovelSortField;
  order: SortOrder;
};

export enum NovelSortField {
  CHAPTER_COUNT = 'CHAPTER_COUNT',
  CREATED_AT = 'CREATED_AT',
  TITLE = 'TITLE',
  VIEWS = 'VIEWS'
}

export enum NovelStatus {
  COMPLETED = 'COMPLETED',
  HIATUS = 'HIATUS',
  ONGOING = 'ONGOING'
}

export enum NovelType {
  CHINEESE_TRANSLATED = 'CHINEESE_TRANSLATED',
  KOREAN_TRANSLATED = 'KOREAN_TRANSLATED',
  LIGHT_NOVEL = 'LIGHT_NOVEL',
  ROYAL_ROAD_ORIGINAL = 'ROYAL_ROAD_ORIGINAL',
  WEBNOVEL_ORIGINAL = 'WEBNOVEL_ORIGINAL'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  novel?: Maybe<Novel>;
  novels?: Maybe<NovelPagination>;
};


export type QueryNovelArgs = {
  nid: Scalars['ID'];
};


export type QueryNovelsArgs = {
  author?: Maybe<Scalars['String']>;
  genre?: Maybe<Genre>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<NovelSort>;
  status?: Maybe<NovelStatus>;
  tags?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<NovelType>;
};

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type Volume = {
  __typename?: 'Volume';
  chapterCount: Scalars['Int'];
  desc: Array<Maybe<Scalars['String']>>;
  name: Scalars['String'];
  vid: Scalars['ID'];
};
