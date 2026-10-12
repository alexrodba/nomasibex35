import React from 'react'
import { Link } from 'gatsby'

/** Legacy URL: meta refresh to the new path (GitHub Pages cannot redirect server-side). */
const Redirect = ({ pageContext }) => (
  <main style={{ padding: '2em', fontFamily: 'sans-serif' }}>
    <p>
      Esta página se ha movido a{' '}
      <Link to={pageContext.to}>{pageContext.to}</Link>.
    </p>
  </main>
)

export default Redirect

export const Head = ({ pageContext }) => (
  <>
    <title>Redirigiendo…</title>
    <meta httpEquiv="refresh" content={`0; url=${pageContext.to}`} />
    <link rel="canonical" href={`https://nomasibex35.com${pageContext.to}`} />
    <meta name="robots" content="noindex" />
  </>
)
