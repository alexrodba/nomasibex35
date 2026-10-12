import es from './es'
import ca from './ca'

export const DEFAULT_LOCALE = 'es'
export const LOCALES = ['es', 'ca']

const dictionaries = { es, ca }

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE]
}

/** Prefix a site-relative path for a locale: ('ca', '/banca/') -> '/ca/banca/'. */
export function localizePath(locale, path) {
  const clean = path.startsWith('/') ? path : `/${path}`
  return locale === DEFAULT_LOCALE ? clean : `/${locale}${clean}`
}

export function otherLocale(locale) {
  return locale === 'es' ? 'ca' : 'es'
}

/** Pick the string for a locale out of a {es, ca} object. */
export function pick(obj, locale) {
  if (!obj) return ''
  return obj[locale] || obj[DEFAULT_LOCALE] || ''
}

export const REPO = 'https://github.com/alexrodba/nomasibex35'
export const SUGGEST_URL = `${REPO}/issues/new?template=sugerir-empresa.yml`
