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
}
export type blogRequestFields = keyof Post;
