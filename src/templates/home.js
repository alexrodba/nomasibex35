import React from 'react'
import { graphql, Link } from 'gatsby'
import { getImage, getSrc } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Seo from '../components/Seo'
import { getDictionary, localizePath, pick } from '../i18n'

const HomePage = ({ data, pageContext }) => {
  const { locale, alternates } = pageContext
  const t = getDictionary(locale)
  const sectors = data.allSectorsYaml.nodes
  const counts = Object.fromEntries(
    data.allCompaniesYaml.group.map((g) => [g.fieldValue, g.totalCount])
  )

  return (
    <Layout locale={locale} alternates={alternates}>
      <section id="banner" className="major">
        <div className="inner">
          <header className="major">
            <h1>{t.home.title}</h1>
          </header>
          <div className="content">
            <p>{t.home.subtitle}</p>
            <ul className="actions">
              <li>
                <a href="#one" className="button next scrolly">
                  {t.home.start}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div id="main">
        <section id="one" className="tiles">
          {sectors.map((s) => {
            const to = localizePath(locale, `/${pick(s.slug, locale)}/`)
            const src = s.image && getSrc(getImage(s.image))
            const n = counts[s.key] || 0
            return (
              <article
                key={s.key}
                style={src ? { backgroundImage: `url(${src})` } : undefined}
              >
                <header className="major">
                  <h3>
                    <Link to={to}>{pick(s.name, locale)}</Link>
                  </h3>
                  <p>
                    {pick(s.tagline, locale)}
                    {n > 0 && <span className="count"> · {n}</span>}
                  </p>
                </header>
                <Link
                  to={to}
                  className="link primary"
                  aria-label={pick(s.name, locale)}
                />
              </article>
            )
          })}
        </section>
        <section id="two">
          <div className="inner">
            <header className="major">
              <h2>{t.home.allHeading}</h2>
            </header>
            <p>{t.home.allText}</p>
            <ul className="actions">
              <li>
                <Link
                  to={localizePath(locale, `/${t.slugs.directory}/`)}
                  className="button next"
                >
                  {t.home.allButton}
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default HomePage

export const Head = ({ pageContext }) => (
  <Seo
    locale={pageContext.locale}
    pathname={pageContext.alternates[pageContext.locale]}
    alternates={pageContext.alternates}
  />
)

export const query = graphql`
  query HomeQuery {
    allSectorsYaml(sort: { order: ASC }) {
      nodes {
        key
        slug {
          es
          ca
        }
        name {
          es
          ca
        }
        tagline {
          es
          ca
        }
        image {
          childImageSharp {
            gatsbyImageData(width: 1000, layout: CONSTRAINED, formats: [AUTO])
          }
        }
      }
    }
    allCompaniesYaml {
      group(field: { sector: SELECT }) {
        fieldValue
        totalCount
      }
    }
  }
`
