/**
 * Importing npm packages.
 */
import sagus from 'sagus';

/**
 * Importing user defined packages.
 */
import { NovelLib, ChapterLib } from '../lib';

/**
 * Importing and defining types.
 */
import type { Resolvers } from '../../api-types';

/**
 * Declaring the constants.
 */

export const resolvers: Resolvers = {
  Query: {
    async novel(_parent, args, _context, _info) {
      const novel = await NovelLib.get(args.nid);
      return novel ? { ...novel, chapters: [] } : undefined;
    },
    async novels(_parent, args, _context, _info) {
      const filter = sagus.removeKeys(args, ['sort']);
      console.log(args);
      const novelList = await NovelLib.list(filter, args.sort);
      return { ...novelList, items: novelList.items.map(novel => ({ ...novel, chapters: [] })) };
    }
  },
  Novel: {
    async chapter(parent, args, _context, _info) {
      const chapter = await ChapterLib.get(parent.nid, args.index);
      return chapter || undefined;
    },
    async chapters(parent, args, _context, _info) {
      const chapters = await ChapterLib.list(parent.nid);
      return chapters.map(chapter => ({ ...chapter, content: [] }));
    }
  }
};
