import type { lang } from './posts/types';
import path from 'path';
import fs from 'fs/promises';

// reads the post inside src/lib/content/[slug]/[lang]/index.md and returns its content as utf-8 string
export const loadPost = async (slug: string, lang: lang): Promise<string> => {
  const filePath = path.join('.', 'src', 'lib', 'content', slug, lang, 'index.svx');

  console.log(filePath);

  //   const { frontmatter } = await import(filePath);

  const file = await fs.readFile(filePath, { encoding: 'utf8' });

  return file;
};
