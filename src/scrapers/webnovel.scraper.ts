/**
 * Importing npm packages.
 */
import inquirer from 'inquirer';
import axios from 'axios';
import sagus from 'sagus';

/**
 * Importing user defined packages.
 */
import { ChapterLib } from '../lib';

/**
 * Importing and defining types.
 */
import type { WebnovelGetChapterResponse, WebnovelListChapterResponse, ChapterItem } from './types';

interface Answers {
  bookId: string;
  chapterId: string;
  cookie: string;
}

/**
 * Declaring the constants.
 */
const CHAPTER_CONTENT_URL = 'https://www.webnovel.com/go/pcm/chapter/getContent';
const CHAPTER_LIST_URL = 'https://www.webnovel.com/go/pcm/chapter/get-chapter-list';

function transformContent(content: string) {
  const startIndex = content.indexOf('<pirate>');
  const endIndex = content.indexOf('</pirate>');
  const pirateRemovedContent = content.substring(0, startIndex) + content.substring(endIndex, content.length);
  return pirateRemovedContent;
}

export class WebnovelScraper {
  private csrfToken = '';
  private bookId = '';
  private cookie = '';
  private firstChapterId = '';

  constructor(private nid: string) {}

  private async getMetadata() {
    const answers = await inquirer.prompt<Answers>([
      { name: 'bookId', message: 'Enter Webnovel Book ID ?' },
      { name: 'chapterId', message: 'Enter first Chapter ID ?' },
      { name: 'cookie', message: 'Enter Webnovel Cookie ?', default: process.env['WEBNOVEL_COOKIE'] },
    ]);
    this.bookId = answers.bookId;
    this.cookie = answers.cookie;
    this.firstChapterId = answers.chapterId;
    const csrfToken = answers.cookie.split(';').find((val) => val.includes('_csrfToken='));
    this.csrfToken = csrfToken?.replace('_csrfToken=', '').trim() || '';
  }

  static async getChapterList(bookId: string) {
    const url = `${CHAPTER_LIST_URL}?bookId=${bookId}&pageIndex=0&_=${Date.now()}`;
    const res = await axios.get<WebnovelListChapterResponse>(url);
    const data = res.data.data;
    if (!data) throw new Error(`No data from server. ${JSON.stringify({ resp: data, bookId })}`);
    const validVolumes = data.volumeItems.filter((volume) => volume.volumeId > 0);
    const chapters = validVolumes.reduce((acc, val) => [...acc, ...val.chapterItems], [] as ChapterItem[]);
    const chapterList = chapters.map((chapter) => sagus.pickKeys(chapter, ['chapterId', 'chapterIndex', 'chapterName']));
    return chapterList.sort((a, b) => (a.chapterIndex < b.chapterIndex ? -1 : 1));
  }

  private async scrapeChapter(chapterId: string) {
    const url = `${CHAPTER_CONTENT_URL}?_csrfToken=${this.csrfToken}&bookId=${this.bookId}&chapterId=${chapterId}&_=${Date.now()}`;
    const res = await axios.get<WebnovelGetChapterResponse>(url, { headers: { Cookie: this.cookie } });
    const data = res.data.data;
    if (!data) throw new Error(`No data from server. ${JSON.stringify({ resp: data, bookId: this.bookId, chapterId, cookie: this.cookie })}`);
    if (data.chapterInfo.isAuth === 0) throw new Error(`Chapter ${data.chapterInfo.chapterIndex}: ${data.chapterInfo.chapterName} -- Content Locked !`);
    const chapter = sagus.pickKeys(data.chapterInfo, ['chapterIndex', 'chapterName', 'nextChapterId', 'preChapterId', 'contents']);
    return { ...chapter, contents: chapter.contents.map((content) => transformContent(content.content)) };
  }

  async run() {
    await this.getMetadata();
    let chapterId = this.firstChapterId;
    do {
      const chapter = await this.scrapeChapter(chapterId);
      const chapterObj = { nid: this.nid, title: chapter.chapterName, content: chapter.contents, index: chapter.chapterIndex };
      if (global.isDryRun()) console.log(chapterObj);
      else await ChapterLib.create(chapterObj);
      chapterId = chapter.nextChapterId;
      console.log(`Chapter ${chapter.chapterIndex}: ${chapter.chapterName} scraped`);
    } while (chapterId);
  }
}
