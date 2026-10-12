import React from 'react'
import { graphql } from 'gatsby'
import { getImage, getSrc } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Seo from '../components/Seo'
import CompanyCard from '../components/CompanyCard'
import { getDictionary, pick, SUGGEST_URL } from '../i18n'

const SectorPage = ({ data, pageContext }) => {
  const { locale, alternates } = pageContext
  const t = getDictionary(locale)
  const sector = data.sectorsYaml
  const companies = data.allCompaniesYaml.nodes
  const ibex = data.allIbex35Yaml.nodes
  const referrals = Object.fromEntries(
    data.allReferralsYaml.nodes.map((r) => [r.key, r])
  )
  const src = sector.image && getSrc(getImage(sector.image))

  return (
    <Layout locale={locale} alternates={alternates}>
      <section
        id="banner"
        className={sector.style || 'style2'}
        style={src ? { backgroundImage: `url(${src})` } : undefined}
      >
        <div className="inner">
          <header className="major">
            <h1>{pick(sector.name, locale)}</h1>
          </header>
          <div className="content">
            <p>{pick(sector.banner, locale)}</p>
          </div>
        </div>
      </section>

      <div id="main">
        <section id="one">
          <div className="inner">
            <header className="major">
              <h2>{pick(sector.heading, locale)}</h2>
            </header>
            <p>{t.sector.ibexList}</p>
            <ul className="ibex-list">
              {ibex.map((c) => (
                <li key={c.name}>
                  {c.name}
                  {c.note && <small> ({pick(c.note, locale)})</small>}
                </li>
              ))}
            </ul>
            {companies.length > 0 && <p>{t.sector.alternatives}</p>}
          </div>
        </section>
        {companies.length > 0 ? (
          <section id="two" className="spotlights">
            {companies.map((c) => (
              <CompanyCard
                key={c.slug}
                company={c}
                referral={c.cta.referral ? referrals[c.cta.referral] : null}
                locale={locale}
              />
            ))}
          </section>
        ) : (
          <section id="two" className="wip">
            <div className="inner">
              <header className="major">
                <h3>
                  {sector.note ? pick(sector.name, locale) : t.sector.wipTitle}
                </h3>
              </header>
              <p>
                {sector.note ? pick(sector.note, locale) : t.sector.wipText}
              </p>
              <ul className="actions">
                <li>
                  <a
                    href={SUGGEST_URL}
                    className="button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.sector.suggest}
                  </a>
                </li>
              </ul>
            </div>
          </section>
        )}
      </div>
    </Layout>
  )
}

export default SectorPage

export const Head = ({ data, pageContext }) => {
  const { locale, alternates } = pageContext
  const t = getDictionary(locale)
  const name = pick(data.sectorsYaml.name, locale)
  const site = 'https://nomasibex35.com'
  const companies = data.allCompaniesYaml.nodes
  return (
    <Seo
      title={t.seo.sectorTitle(name)}
      description={t.seo.sectorDescription(name)}
      locale={locale}
      pathname={alternates[locale]}
      alternates={alternates}
      image={`/og/${locale}-${data.sectorsYaml.key}.jpg`}
      preloadImage={
        data.sectorsYaml.image && getSrc(getImage(data.sectorsYaml.image))
      }
      jsonLd={
        companies.length > 0
          ? {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: t.seo.sectorTitle(name),
              url: `${site}${alternates[locale]}`,
              numberOfItems: companies.length,
              itemListElement: companies.map((c, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'Organization',
                  name: c.name,
                  url: c.website,
                  description: pick(c.description, locale),
                },
              })),
            }
          : undefined
      }
    />
  )
}

export const query = graphql`
  query SectorQuery($sectorKey: String!) {
    sectorsYaml(key: { eq: $sectorKey }) {
      key
      style
      name {
        es
        ca
      }
      heading {
        es
        ca
      }
      banner {
        es
        ca
      }
      note {
        es
        ca
      }
      image {
        childImageSharp {
          # Sits under an 85% colour overlay: low quality is invisible and keeps LCP fast
          gatsbyImageData(
            width: 1280
            layout: CONSTRAINED
            formats: [WEBP]
            quality: 40
          )
        }
      }
    }
    allIbex35Yaml(filter: { sector: { eq: $sectorKey } }, sort: { name: ASC }) {
      nodes {
        name
        note {
          es
          ca
        }
      }
    }
    allCompaniesYaml(
      filter: { sector: { eq: $sectorKey } }
      sort: { name: ASC }
    ) {
      nodes {
        ...CompanyFields
      }
    }
    allReferralsYaml {
      nodes {
        key
        status
        url
        program
      }
    }
  }
`
