import React from 'react'

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: 'es' })
  const head = [
    <meta
      key="design-credit"
      name="credits"
      content="Design based on Forty by HTML5 UP (html5up.net), CC BY 3.0"
    />,
    <link key="humans" rel="author" href="/humans.txt" type="text/plain" />,
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
