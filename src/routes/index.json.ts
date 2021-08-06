import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';
import type { Post, PostFrontMatter } from '$src/lib/posts/types';

export async function get(): Promise<{ body: Partial<Post>[] }> {
  const metadata = getPostsMetaData();
  return {
    body: metadata,
  };
}

function getPostsMetaData(): Partial<Post>[] {
  const blogDirPath = path.join('.', 'src', 'routes', 'blog');
  const posts = fs
    .readdirSync(blogDirPath)
    .filter((elem) => elem.endsWith('.svx'))
    .map((postFilename) => {
      const blogPostPath = path.join(blogDirPath, postFilename);
      const postContent = fs.readFileSync(blogPostPath, {
        encoding: 'utf8',
      });

      const postFrontMatter = frontMatter<PostFrontMatter>(postContent);

      return {
        frontmatter: postFrontMatter.attributes,
        slug: path.parse(blogPostPath).name,
      };
    });
  return posts;
}
