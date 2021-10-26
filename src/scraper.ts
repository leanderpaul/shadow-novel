/**
 * Importing npm packages.
 */
import mongoose from 'mongoose';
import inquirer from 'inquirer';
import axios from 'axios';
import sagus from 'sagus';

/**
 * Importing user defined packages.
 */
import { Genre, NovelType } from './models';
import { NovelLib } from './lib/index';
import { WebnovelScraper } from './scrapers/webnovel.scraper';

/**
 * Importing and defining types.
 */
import type { INovel } from './models';

interface BasicAnswers {
  website: 'webnovel' | 'boxnovel';
  nid: string;
}

type NovelAnswers = Pick<INovel, 'title' | 'type' | 'author' | 'genre'> & { hasVolumes: boolean; tags: string; coverURL: string; summary: string };

declare global {
  namespace NodeJS {
    interface Global {
      isDryRun(): boolean;
    }
  }
}

/**
 * Declaring the constants.
 */

global.isDryRun = function () {
  return process.env['DRY_RUN'] === 'true' ? true : false;
};

async function createNewNovel() {
  const answers = await inquirer.prompt<NovelAnswers>([
    { name: 'type', message: 'Select the novel type: ', type: 'list', choices: Object.keys(NovelType) },
    { name: 'title', message: 'Enter novel title: ' },
    { name: 'author', message: 'Enter novel author: ' },
    { name: 'coverURL', message: 'Enter novel cover url: ' },
    { name: 'genre', message: 'Select the novel genres: ', type: 'list', choices: Object.keys(Genre) },
    { name: 'tags', message: 'Enter the novel tags seperated with comma: ' },
    { name: 'summary', message: 'Enter the novel summary: ', type: 'editor' },
    { name: 'hasVolumes', message: 'Does this novel have volumes: ', type: 'confirm' },
  ]);
  const tags = answers.tags.split(',').map((tag) => tag.trim());
  const newNovel = sagus.removeKeys(answers, ['coverURL', 'tags']);
  let cover: string | undefined;
  if (answers.coverURL) {
    const res = await axios.get(answers.coverURL, { responseType: 'arraybuffer' });
    cover = 'data:image/jpg;base64,' + Buffer.from(res.data).toString('base64');
  }
  const summary = answers.summary.split('<br>').filter((para) => para);
  const novelObj = { ...newNovel, tags, cover, summary };
  if (global.isDryRun()) {
    console.log('New novel', novelObj);
    return 'dummy-nid';
  }
  const novel = await NovelLib.create(novelObj);
  console.log(`Novel created successfully !`);
  return novel.nid;
}

async function run() {
  try {
    const answers = await inquirer.prompt<BasicAnswers>([
      { type: 'list', name: 'website', message: 'Select the website from which the novel has to be scraped?', choices: ['boxnovel', 'webnovel'] },
      { name: 'nid', message: 'Novel ID (leave blank to create new novel):' },
    ]);
    const nid = answers.nid || (await createNewNovel());
    const scraper = new WebnovelScraper(nid);
    await scraper.run();
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
}

mongoose.connect('mongodb://localhost/shadow-novel').then(run);
