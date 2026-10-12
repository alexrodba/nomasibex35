import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { DEFAULT_LOCALE, getDictionary } from '../i18n'

const Seo = ({
  title,
  description,
  pathname = '/',
  locale = DEFAULT_LOCALE,
  alternates,
  children,
}) => {
  const { site } = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `)
  const meta = site.siteMetadata
  const t = getDictionary(locale)
  const fullTitle = title ? `${title} | ${meta.title}` : meta.title
  const desc = description || t.seo.description
  const url = `${meta.siteUrl}${pathname}`

  return (
    <>
      <html lang={locale} />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {alternates &&
        Object.entries(alternates).map(([lang, p]) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`${meta.siteUrl}${p}`}
          />
        ))}
      {alternates && alternates[DEFAULT_LOCALE] && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${meta.siteUrl}${alternates[DEFAULT_LOCALE]}`}
        />
      )}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={t.ogLocale} />
      <meta name="twitter:card" content="summary" />
      {children}
    </>
  )
}

export default Seo
