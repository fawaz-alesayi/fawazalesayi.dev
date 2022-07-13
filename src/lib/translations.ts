import i18n from 'sveltekit-i18n';

/** @type {import('sveltekit-i18n').Config} */
const config = {
  loaders: [
    {
      locale: 'en',
      key: 'common',
      loader: async () => (await import('$lib/translations/en/common.json')),
    },
    {
      locale: 'en',
      key: 'index',
      routes: ['/blog'],
      loader: async () => (await import('$lib/translations/en/index.json')),
    },
    {
      locale: 'ar',
      key: 'index',
      routes: ['/blog'],
      loader: async () => (await import('$lib/translations/ar/index.json')),
    },
  ],
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
