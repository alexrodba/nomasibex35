import React from 'react'

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: 'es' })
  const head = [
    <link key="favicon-ico" rel="icon" href="/favicon.ico" sizes="32x32" />,
    <link
      key="favicon-svg"
      rel="icon"
      href="/favicon.svg"
      type="image/svg+xml"
    />,
  ]
  if (process.env.GATSBY_GA4_ID) {
    head.push(
      <link
        key="preconnect-gtm"
        rel="preconnect"
        href="https://www.googletagmanager.com"
      />
    )
  }
  setHeadComponents(head)
}
