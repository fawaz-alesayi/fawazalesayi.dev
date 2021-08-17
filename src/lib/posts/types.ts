export type lang = 'en' | 'ar';

export interface Post {
  frontmatter: PostFrontMatter;
  html: string;
  readingTime: string;
  slug: string;
}

export interface PostFrontMatter {
  title: string;
  creationDate: Date;
  excerpt: string;
  coverImageUrl: string;
  tags: string[];
  hidden: boolean;
  slug: string;
}
export type blogRequestFields = keyof Post;
