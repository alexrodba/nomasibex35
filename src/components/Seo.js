import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const Seo = ({ title, description, pathname = '/', lang = 'es', children }) => {
  const { site } = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          siteUrl
          description
        }
      }
    }
  `)
  const meta = site.siteMetadata
  const fullTitle = title ? `${title} | ${meta.title}` : meta.title
  const desc = description || meta.description
  const url = `${meta.siteUrl}${pathname}`

  return (
    <>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={lang === 'ca' ? 'ca_ES' : 'es_ES'} />
      <meta name="twitter:card" content="summary" />
      {children}
    </>
  )
}

export default Seo
