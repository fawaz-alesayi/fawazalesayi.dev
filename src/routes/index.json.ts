import fs from 'fs';
import frontMatter from 'front-matter';
import type { Post, PostFrontMatter } from '$src/lib/posts/types';

export async function get(): Promise<{ body: Partial<Post>[] }> {
  const metadata = getPostsMetaData();
  return {
    body: metadata
  };
}

  function getPostsMetaData(): Partial<Post>[] {
    const posts = fs
    .readdirSync('./src/')
    .filter((elem) => elem.endsWith('.svx'))
    .map((postFilename) => {
      const postContent = fs.readFileSync(`./src/routes/blog/${postFilename}`, {
        encoding: 'utf8',
      });
  
      const postFrontMatter = frontMatter<PostFrontMatter>(postContent);
  
      return {
        frontmatter: postFrontMatter.attributes,
        slug: postFilename,
      };
    })
    return posts;
  }