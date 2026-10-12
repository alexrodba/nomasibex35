import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Seo from '../components/Seo'
import bannerWebp from '../assets/images/banner.webp'
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
            const img = s.image && getImage(s.image)
            const n = counts[s.key] || 0
            return (
              <article key={s.key}>
                {img && (
                  <GatsbyImage
                    image={img}
                    alt=""
                    className="tile-bg"
                    objectFit="cover"
                  />
                )}
                <header className="major">
                  <h2>
                    <Link to={to}>{pick(s.name, locale)}</Link>
                  </h2>
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

export const Head = ({ pageContext }) => {
  const { locale, alternates } = pageContext
  const t = getDictionary(locale)
  const site = 'https://nomasibex35.com'
  return (
    <Seo
      locale={locale}
      pathname={alternates[locale]}
      alternates={alternates}
      image={`/og/${locale}-home.jpg`}
      preloadImage={bannerWebp}
      jsonLd={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${site}/#website`,
            url: `${site}${alternates[locale]}`,
            name: 'No Más IBEX 35',
            description: t.seo.description,
            inLanguage: locale,
            publisher: { '@id': `${site}/#organization` },
          },
          {
            '@type': 'Organization',
            '@id': `${site}/#organization`,
            name: 'No Más IBEX 35',
            url: site,
            logo: `${site}/favicon.svg`,
            sameAs: ['https://github.com/alexrodba/nomasibex35'],
          },
        ],
      }}
    />
  )
}

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
            gatsbyImageData(
              width: 800
              layout: CONSTRAINED
              formats: [AUTO, WEBP]
              quality: 70
            )
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
