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

export enum NovelType {
  LIGHT_NOVEL = 'LIGHT_NOVEL',
  CHINEESE_TRANSLATED = 'CHINEESE_TRANSLATED',
  KOREAN_TRANSLATED = 'KOREAN_TRANSLATED',
  WEBNOVEL_ORIGINAL = 'WEBNOVEL_ORIGINAL',
  ROYAL_ROAD_ORIGINAL = 'ROYAL_ROAD_ORIGINAL',
}

export enum Genre {
  CONTEMPORARY_ROMANCE = 'CONTEMPORARY_ROMANCE',
  EASTERN_FANTASY = 'EASTERN_FANTASY',
  MAGICAL_REALISM = 'MAGICAL_REALISM',
  SCIENCE_FICTION = 'SCIENCE_FICTION',
  VIDEO_GAMES = 'VIDEO_GAMES',
  WESTERN_FANTASY = 'WESTERN_FANTASY',
}

export enum NovelStatus {
  COMPLETED = 'COMPLETED',
  ONGOING = 'ONGOING',
  HIATUS = 'HIATUS',
}

export interface Volume {
  vid: string;
  name: string;
  desc: string[];
  chapterCount: number;
}

export interface INovel {
  nid: string;
  cover?: string;
  author: string;
  title: string;
  type: NovelType;
  genre: Genre;
  tags: string[];
  status: NovelStatus;
  summary: string[];
  chapterCount: number;
  views: number;
  volumes: Volume[];
  createdAt: Date;
}

/**
 * Declaring the constants.
 */
const volumeSchema = new Schema(
  {
    vid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: [String],
      required: true,
    },
    chapterCount: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const novelSchema = new Schema<INovel, Model<INovel>, INovel>(
  {
    nid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.keys(NovelType),
    },
    cover: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
      enum: Object.keys(Genre),
    },
    tags: {
      type: [String],
      required: true,
    },
    chapterCount: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    summary: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: NovelStatus.ONGOING,
      enum: Object.keys(NovelStatus),
    },
    volumes: {
      type: [volumeSchema],
      default: void 0,
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
novelSchema.index({ nid: 1 }, { name: 'UNIQUE_NID', unique: true });

/**
 * Exporting the novel model.
 */
const Novel = model<INovel>('novels', novelSchema);
export default Novel;
export { Novel };
