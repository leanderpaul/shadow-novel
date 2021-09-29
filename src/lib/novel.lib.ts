/**
 * Importing npm packages.
 */
import sagus from 'sagus';

/**
 * Importing user defined packages.
 */
import { Novel, NovelSortField, SortOrder } from '../models';

/**
 * Importing and defining types.
 */
import type { INovel } from '../models';
import type { PageInfo, Sort } from '../types';

export type NewNovel = Pick<INovel, 'title' | 'author' | 'cover' | 'genre' | 'summary' | 'tags' | 'type'> & { hasVolumes?: boolean };

export type NovelFilter = Partial<Pick<INovel, 'title' | 'author' | 'genre' | 'tags' | 'type' | 'status'>> & Partial<PageInfo>;

export type NovelSort = Sort<NovelSortField>;

/**
 * Declaring the constants.
 */
const SORT_KEY_MAPPING = {
  [NovelSortField.TITLE]: 'title',
  [NovelSortField.CHAPTER_COUNT]: 'chapterCount',
  [NovelSortField.CREATED_AT]: 'createdAt',
  [NovelSortField.VIEWS]: 'views',
};

function createVolume(index = 1, name?: string, desc?: string[]) {
  const vid = sagus.genUUID();
  return { vid, name: name || `Volume ${index}`, desc: desc || [], chapterCount: 0 };
}

class NovelLib {
  private constructor() {}

  static async create(newNovel: NewNovel) {
    const nid = sagus.genUUID();
    const novelObj = sagus.removeKeys(newNovel, ['hasVolumes']);
    const volumes = newNovel.hasVolumes ? [createVolume()] : undefined;
    const novel = await Novel.create({ ...novelObj, nid, volumes });
    return novel.toJSON();
  }

  static async get<T extends keyof INovel>(nid: string): Promise<INovel | null>;
  static async get<T extends keyof INovel>(nid: string, projection: T[]): Promise<Pick<INovel, T> | null>;
  static async get<T extends keyof INovel>(nid: string, projection?: T[]): Promise<INovel | Pick<INovel, T> | null> {
    const novel = await Novel.findOne({ nid }, projection ? projection.join(' ') : '-_id').lean();
    await Novel.updateOne({ nid }, { $inc: { views: 1 } });
    return novel;
  }

  static async list(filter: NovelFilter = { offset: 0, limit: 20 }, sort: NovelSort = { field: NovelSortField.TITLE, order: SortOrder.ASC }) {
    const query = Novel.find();
    const offset = filter.offset && filter.offset > 0 ? filter.offset : 0;
    const limit = filter.limit ? (filter.limit > 0 && filter.limit <= 100 ? filter.limit : filter.limit > 100 ? 100 : 0) : 20;
    if (filter.title) query.where('title', new RegExp(filter.title, 'i'));
    if (filter.author) query.where('author', filter.author);
    if (filter.genre && filter.genre.length > 0) query.all('genre', filter.genre);
    if (filter.status) query.where('status', filter.status);
    if (filter.tags && filter.tags.length > 0) query.all('tags', filter.tags);
    if (filter.type) query.where('type', filter.type);
    query.skip(offset).limit(limit);
    query.sort({ [SORT_KEY_MAPPING[sort.field]]: sort.order });
    const [novelList, totalCount] = await Promise.all([query.lean(), Novel.countDocuments(query.getFilter())]);
    return { items: novelList, totalCount, pageInfo: { offset, limit } };
  }

  static update() {}

  static delete() {}

  static addVolume() {}

  static removeVolume() {}

  static updateVolume() {}
}

export { NovelLib };
export default NovelLib;
