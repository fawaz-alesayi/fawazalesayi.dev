import type { RequestHandler } from './__types';

// redirect to default language url
export const get: RequestHandler = async ({ url }) => {
  return {
    status: 302,
    headers: {
      Location: new URL(url.pathname + '/blog', url.origin).href
    },
  };
}
