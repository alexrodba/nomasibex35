import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { DEFAULT_LOCALE, getDictionary } from '../i18n'

const Seo = ({
  title,
  description,
  pathname = '/',
  locale = DEFAULT_LOCALE,
  alternates,
  image,
  preloadImage,
  jsonLd,
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
  const imageUrl = `${meta.siteUrl}${image || `/og/${locale}-home.jpg`}`

  return (
    <>
      <html lang={locale} />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {preloadImage && (
        <link
          rel="preload"
          as="image"
          href={preloadImage}
          fetchpriority="high"
        />
      )}
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
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={imageUrl} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {children}
    </>
  )
}

export default Seo
