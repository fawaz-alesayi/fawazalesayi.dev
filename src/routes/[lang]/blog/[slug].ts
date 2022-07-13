import { loadPost } from '$src/lib/loadPost';
import { compile } from 'mdsvex';

export const get: import('./__types/[slug]').RequestHandler = async ({ request, params }) => {
    const lang = params.lang;
    if (lang != 'en' && lang != 'ar') {
        return {
            status: 404,
        };
    }

    const slug = params.slug;

    const postData = await loadPost(slug, lang);

    return {
        status: 301,
        headers: {
            Location: `/${lang}/blog/${slug}`,
        },
    }
    
    return { body: {} };
}