import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/Seo'
import { CONSENT_KEY, DENIED, storeConsent } from '../lib/analytics'
import { getDictionary } from '../i18n'

const CookiesPage = ({ pageContext }) => {
  const { locale, alternates } = pageContext
  const t = getDictionary(locale)
  return (
    <Layout locale={locale} alternates={alternates}>
      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <header className="major">
              <h1>{t.cookies.title}</h1>
            </header>
            <p>{t.cookies.p1}</p>
            <p>{t.cookies.p2}</p>
            <ul className="actions">
              <li>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    storeConsent(DENIED)
                    window.location.reload()
                  }}
                >
                  {t.cookies.withdraw}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    try {
                      window.localStorage.removeItem(CONSENT_KEY)
                    } catch (e) {
                      // ignore
                    }
                    window.location.reload()
                  }}
                >
                  {t.cookies.askAgain}
                </button>
              </li>
            </ul>
            <p>{t.cookies.p3}</p>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default CookiesPage

export const Head = ({ pageContext }) => {
  const { locale, alternates } = pageContext
  const t = getDictionary(locale)
  return (
    <Seo
      title={t.cookies.title}
      description={t.cookies.description}
      locale={locale}
      pathname={alternates[locale]}
      alternates={alternates}
    />
  )
}
