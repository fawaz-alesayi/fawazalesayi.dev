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
  published: boolean;
  slug: string;
}
export type blogRequestFields = keyof Post;
