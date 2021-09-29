export interface WebnovelListChapterResponse {
  code: number;
  data: {
    bookInfo: BookInfo;
    curReadChapter: number;
    last: boolean;
    lastChapterItem: ChapterItem;
    volumeItems: VolumeItem[];
  } | null;
  msg: string;
}

export interface WebnovelGetChapterResponse {
  code: number;
  data: {
    bookInfo: BookInfo;
    chapterInfo: ChapterInfo;
    machineTrans: MachineTrans;
    membershipStatus: number;
    waitpayStatus: number;
  } | null;
  msg: string;
}

interface BookInfo {
  authorName: string;
  bookId: string;
  bookName: string;
  bookType: number;
  categoryId: number;
  categoryName: string;
  categoryType: number;
  hasPrivilege: number;
  tagInfos: TagInfo[];
  totalChapterNum: number;
}

interface TagInfo {
  tagId: number;
  tagName: string;
  likeCount: number;
  like: boolean;
}

export interface ChapterItem {
  chapterId: string;
  chapterIndex: number;
  chapterLevel: number;
  chapterName: string;
  isAuth: number;
  isVip: number;
  noArchive: number;
  publishTimeFormat: string;
  userLevel: number;
}

interface VolumeItem {
  chapterItems: ChapterItem[];
  volumeId: number;
  volumeName: string;
}

interface ChapterInfo {
  chapterId: string;
  chapterName: string;
  chapterIndex: number;
  preChapterId: string;
  preChapterName: string;
  nextChapterId: string;
  nextChapterName: string;
  vipStatus: number;
  price: number;
  originalPrice: number;
  discountInfo: string;
  chapterLevel: number;
  userLevel: number;
  contents: Content[];
  isAuth: number;
  batchUnlockStatus: number;
  isRichFormat: number;
  announcementItems: any[];
  groupItems: any[];
  editorItems: any[];
  translatorItems: any[];
  firstChapterId: string;
  chapterReviewItems: ChapterReviewItem[];
  firstChapterIndex: number;
  reviewTotal: number;
  notes: Notes;
  orderIndex: number;
  noArchive: number;
  transRating: number;
  paragraphs: any[];
  banner: Banner;
}

interface Banner {
  coverUrl: string;
  desc: string;
}

interface ChapterReviewItem {
  reviewId: string;
  content: string;
  userId: number;
  createTime: string;
  reviewType: number;
  pUserId: number;
  pContent: string;
  likeNums: number;
  isLiked: number;
  status: number;
  pStatus: number;
  commentType: number;
  appId: number;
  pAppId: number;
  UUT: number;
  userName: string;
  avatar: number;
  penName: string;
  pUUT: number;
  pUserName: string;
  pUserImg: number;
  pPenName: string;
  role: number;
  userLevel: number;
  badgeInfo: BadgeInfo;
}

interface BadgeInfo {
  badgeId: number;
  badgeType: string;
  badgeName: string;
  maxGrade: number;
  baseUrl: string;
  updateTime: number;
}

interface Content {
  contentId: string;
  content: string;
  appId: number;
  userId: number;
  paragraphId: string;
  likeAmount: number;
  contentAmount: number;
  userName: string;
  UUT: number;
  isLiked: number;
}

interface Notes {
  name: string;
  guid: string;
  penName: string;
  avatar: string;
  UUT: number;
  role: string;
  note: string;
}

interface MachineTrans {
  isWhiteUser: number;
}
