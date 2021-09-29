/**
 * Importing npm packages.
 */

/**
 * Importing user defined packages.
 */
import { Chapter, Novel } from '../models';

/**
 * Importing and defining types.
 */
import type { IChapter } from '../models';

type ChapterInput = Omit<IChapter, 'createdAt' | 'index'> & { index?: number };

/**
 * Declaring the constants.
 */
function transformContent(content: string) {
  return content.replace(/[\n\r]/g, '');
}

class ChapterLib {
  private constructor() {}

  static async create(newChapter: ChapterInput) {
    const novel = await Novel.findOne({ nid: newChapter.nid }, 'nid chapterCount').lean();
    if (!novel) throw 'No Such novel exists !';
    const index = newChapter.index || novel.chapterCount + 1;
    const content = newChapter.content.map(transformContent);
    const chapter = await Chapter.create({ ...newChapter, index, content });
    await Novel.updateOne({ nid: novel.nid }, { $inc: { chapterCount: 1 } });
    return chapter.toJSON();
  }

  static async get(nid: string, index: number) {
    return await Chapter.findOne({ nid, index }, '-_id').lean();
  }

  static async list(nid: string) {
    return await Chapter.find({ nid }, '-_id -content').lean();
  }

  static delete() {}

  static update() {}
}

export { ChapterLib };
export default ChapterLib;
