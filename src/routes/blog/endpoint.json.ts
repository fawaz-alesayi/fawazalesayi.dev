import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';
import type { PostFrontMatter, lang } from '$src/lib/posts/types';
import type { RequestHandler } from '@sveltejs/kit';
import parser from 'accept-language-parser';

// Required because SvelteKit endpoints do not support TypeScript Interfaces as a return type for some reason.
export type Typify<T> = { [K in keyof T]: Typify<T[K]> };

interface EndpointOutput {
  metadata: PostFrontMatter[];
  lang: string;
}

export const get: RequestHandler<unknown, unknown, Typify<EndpointOutput>> = async ({
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
      // e.g. /blog/post-name/{en, ar}/frontmatter
      const blogPostMetadataPath = path.join(blogDirPath, postDir.name, lang, 'frontmatter');

      // e.g. /blog/post-name/shared_frontmatter
      const sharedMetadataPath = path.join(blogDirPath, postDir.name, 'shared_frontmatter');

      const postFrontMatter = readFrontMatter(blogPostMetadataPath);
      const sharedFrontMatter = readFrontMatter(sharedMetadataPath);

      // Merge the frontmatter of the post with the shared frontmatter
      // postFrontMatter overrides sharedFrontMatter
      return { ...sharedFrontMatter.attributes, ...postFrontMatter.attributes };
    })
    .filter((metadata) => metadata.published);

  return posts;
}

function readFrontMatter(blogPostMetadataPath: string) {
  const postMetadata = fs.readFileSync(blogPostMetadataPath, {
    encoding: 'utf8',
  });
  const postFrontMatter = frontMatter<PostFrontMatter>(postMetadata);
  return postFrontMatter;
}
