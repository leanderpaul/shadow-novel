/**
 * Importing npm packages.
 */
import { Schema, model } from 'mongoose';

/**
 * Importing user defined packages.
 */

/**
 * Importing and defining types.
 */
import type { Model } from 'mongoose';

export interface IChapter {
  nid: string;
  index: number;
  title: string;
  content: string[];
  createdAt: Date;
}

/**
 * Declaring the constants.
 */
const chapterSchema = new Schema<IChapter, Model<IChapter>, IChapter>(
  {
    nid: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: [String],
      required: true,
    },
  },
  {
    strict: 'throw',
    versionKey: false,
    timestamps: { updatedAt: false },
  }
);

/**
 * Setting up indexes.
 */
chapterSchema.index({ nid: 1, index: 1 }, { name: 'UNIQUE_NID_AND_INDEX', unique: true });

/**
 * Exporting the chapter model.
 */
const Chapter = model<IChapter>('chapters', chapterSchema);
export default Chapter;
export { Chapter };
