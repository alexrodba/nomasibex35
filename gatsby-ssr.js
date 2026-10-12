import React from 'react'

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: 'es' })
  if (process.env.GATSBY_GA4_ID) {
    setHeadComponents([
      <link
        key="preconnect-gtm"
        rel="preconnect"
        href="https://www.googletagmanager.com"
      />,
    ])
  }
}
