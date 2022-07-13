import fs from 'fs/promises';
import { join } from 'path';
import frontMatter from 'front-matter';
import type { PostFrontMatter, lang } from '$lib/posts/types';
import parser from 'accept-language-parser';


export const get: import('./__types/index').RequestHandler = async ({ request, params }) => {
  const headers = request.headers;

  let lang = params.lang;

  if (!lang) {
    lang = parser.pick(['en', 'ar'], headers.get('Accept-Language') ?? 'en') ?? 'en';
  }

  const metadata = await getPostsMetaData(lang as lang);


  return {
    body: {
      language: lang,
      metadata,
    },
  };
};

async function getPostsMetaData(lang: lang): Promise<PostFrontMatter[]> {
  const blogDirPath = join('.', 'src', 'routes', '[lang]', 'blog');
  const postsPromise = await fs.readdir(blogDirPath, { withFileTypes: true });

  const postDirs = postsPromise.filter((dirent) => dirent.isDirectory());

  const postsFrontMatter = postDirs.map(async (postDir) => {
    // e.g. /blog/post-name/{en, ar}/frontmatter
    const blogPostMetadataPath = join(blogDirPath, postDir.name, lang, 'index.svx');

    // e.g. /blog/post-name/shared_frontmatter
    const sharedMetadataPath = join(blogDirPath, postDir.name, 'shared_frontmatter');

    const postFrontMatter = await readFrontMatter(blogPostMetadataPath);

    const sharedFrontMatter = await readFrontMatter(sharedMetadataPath);

    // Merge the frontmatter of the post with the shared frontmatter
    // postFrontMatter overrides sharedFrontMatter
    return { ...sharedFrontMatter.attributes, ...postFrontMatter.attributes };
  });

  const postsMetaData = await Promise.all(postsFrontMatter);

  const publishedPosts = postsMetaData.filter((post) => post.published);

  return publishedPosts;
}

export async function readFrontMatter(blogPostMetadataPath: string) {
  const postMetadata = await fs.readFile(blogPostMetadataPath, {
    encoding: 'utf8',
  });
  const postFrontMatter = frontMatter<PostFrontMatter>(postMetadata);
  return postFrontMatter;
}
