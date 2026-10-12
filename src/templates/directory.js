import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/Seo'
import bannerWebp from '../assets/images/banner.webp'
import CompanyCard from '../components/CompanyCard'
import { getDictionary, localizePath, pick } from '../i18n'

const DirectoryPage = ({ data, pageContext }) => {
  const { locale, alternates } = pageContext
  const t = getDictionary(locale)
  const [tag, setTag] = useState('')
  const sectors = data.allSectorsYaml.nodes
  const companies = data.allCompaniesYaml.nodes
  const referrals = Object.fromEntries(
    data.allReferralsYaml.nodes.map((r) => [r.key, r])
  )
  const tags = Array.from(new Set(companies.flatMap((c) => c.tags))).sort()
  const visible = tag
    ? companies.filter((c) => c.tags.includes(tag))
    : companies

  return (
    <Layout locale={locale} alternates={alternates}>
      <section id="banner" className="style1">
        <div className="inner">
          <header className="major">
            <h1>{t.directory.title}</h1>
          </header>
          <div className="content">
            <p>{t.directory.banner}</p>
          </div>
        </div>
      </section>

      <div id="main">
        <section id="one">
          <div className="inner">
            <p>{t.directory.intro}</p>
            <div
              className="filter"
              role="group"
              aria-label={t.directory.filter}
            >
              <span className="filter-label">{t.directory.filter}:</span>
              <ul className="tags">
                <li>
                  <button
                    type="button"
                    className={`tag ${tag === '' ? 'is-active' : ''}`}
                    onClick={() => setTag('')}
                    aria-pressed={tag === ''}
                  >
                    {t.directory.all}
                  </button>
                </li>
                {tags.map((x) => (
                  <li key={x}>
                    <button
                      type="button"
                      className={`tag tag-${x} ${tag === x ? 'is-active' : ''}`}
                      onClick={() => setTag(x)}
                      aria-pressed={tag === x}
                    >
                      {t.tags[x] || x}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {sectors.map((s) => {
          const list = visible.filter((c) => c.sector === s.key)
          if (list.length === 0) return null
          return (
            <React.Fragment key={s.key}>
              <section className="directory-sector">
                <div className="inner">
                  <header className="major">
                    <h2>
                      <Link
                        to={localizePath(locale, `/${pick(s.slug, locale)}/`)}
                      >
                        {pick(s.name, locale)}
                      </Link>
                    </h2>
                  </header>
                </div>
              </section>
              <section className="spotlights">
                {list.map((c) => (
                  <CompanyCard
                    key={c.slug}
                    company={c}
                    referral={c.cta.referral ? referrals[c.cta.referral] : null}
                    locale={locale}
                    page="directory"
                  />
                ))}
              </section>
            </React.Fragment>
          )
        })}
        {visible.length === 0 && (
          <section>
            <div className="inner">
              <p>{t.directory.none}</p>
            </div>
          </section>
        )}
      </div>
    </Layout>
  )
}

export default DirectoryPage

export const Head = ({ pageContext }) => {
  const { locale, alternates } = pageContext
  const t = getDictionary(locale)
  return (
    <Seo
      title={t.directory.title}
      description={t.directory.intro}
      locale={locale}
      pathname={alternates[locale]}
      alternates={alternates}
      preloadImage={bannerWebp}
    />
  )
}

export const query = graphql`
  query DirectoryQuery {
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
      }
    }
    allCompaniesYaml(sort: { name: ASC }) {
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
