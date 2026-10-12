import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/Seo'
import { getDictionary } from '../i18n'

const NotFoundPage = () => {
  const t = getDictionary('es')
  return (
    <Layout locale="es">
      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <header className="major">
              <h1>{t.notFound.title}</h1>
            </header>
            <p>{t.notFound.text}</p>
            <ul className="actions">
              <li>
                <Link to="/" className="button">
                  {t.notFound.back}
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => (
  <Seo title={getDictionary('es').notFound.title} pathname="/404/">
    <meta name="robots" content="noindex" />
  </Seo>
)
