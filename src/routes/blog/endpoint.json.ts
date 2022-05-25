import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';
import type { PostFrontMatter, lang } from '$src/lib/posts/types';
import parser from 'accept-language-parser';

interface EndpointOutput {
  metadata: PostFrontMatter[];
  lang: string;
}

/** @type {import('./__types/endpoint.json').RequestHandler} */
export const get = async ({request}) => {
  const headers = request.headers
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
