import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';
import type { PostFrontMatter } from '$src/lib/posts/types';
import type { RequestHandler } from '@sveltejs/kit';
import parser from 'accept-language-parser';
import type { lang } from '$src/lib/posts/types';

export type Typify<T> = { [K in keyof T]: Typify<T[K]> };

export const get: RequestHandler<unknown, unknown, Typify<PostFrontMatter[]>> = async ({
  headers,
}) => {
  const lang = parser.pick(['en', 'ar'], headers['Accept-Language']) ?? 'en';

  const metadata = getPostsMetaData(lang);

  return {
    body: {
      metadata,
      lang: lang,
    },
  };
};

function getPostsMetaData(lang: lang): PostFrontMatter[] {
  const blogDirPath = path.join('.', 'src', 'routes', 'blog');
  const posts = fs
    .readdirSync(blogDirPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((postDir) => {
      const blogPostMetadataPath = path.join(blogDirPath, postDir.name, 'shared_frontmatter.yaml');
      const postMetadata = fs.readFileSync(blogPostMetadataPath, {
        encoding: 'utf8',
      });

      const postFrontMatter = frontMatter<PostFrontMatter>(postMetadata);

      return postFrontMatter.attributes;
    });

  return posts;
}