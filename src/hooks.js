import { locales } from '$lib/translations';

const routeRegex = new RegExp(/^\/[^.]*([?#].*)?$/);

const DEFAULT_LOCALE = 'en';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  const { url, request } = event;
  const { pathname } = url;


  // If this request is a route request
  if (routeRegex.test(pathname)) {
    // Get defined locales
    const supportedLocales = locales.get();

    // Try to get locale from `pathname`.
    let locale = supportedLocales.find((l) => l === `${pathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase());

    // If route locale is not supported
    if (!locale) {
      // Get user preferred locale
      locale = `${`${request.headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();

      // Set default locale if user preferred locale does not match
      if (!supportedLocales.includes(locale)) locale = DEFAULT_LOCALE;

      return new Response(undefined, { headers: { 'location': `/${locale}${pathname}` }, status: 301 });
    }

    // Add html `lang` attribute
    return resolve(event, {
      transformPage: ({ html }) => html.replace(/%lang%/, `${locale}>`),
    });
  }

  return resolve(event);
};