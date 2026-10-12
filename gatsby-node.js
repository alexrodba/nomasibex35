const path = require('path')

const LOCALES = ['es', 'ca']
const DEFAULT_LOCALE = 'es'
const localizePath = (locale, p) =>
  locale === DEFAULT_LOCALE ? p : `/${locale}${p}`

// Per-locale slugs for the non-sector pages. Keep in sync with src/i18n/*.js `slugs`.
const SLUGS = {
  es: { directory: 'empresas', cookies: 'cookies' },
  ca: { directory: 'empreses', cookies: 'cookies' },
}

// Old URLs (2020 site) -> sector key
const LEGACY_PATHS = {
  '/energy/': 'energia',
  '/banking/': 'banca',
  '/telcos/': 'telefonia',
  '/realestate/': 'vivienda',
  '/services/': 'servicios',
  '/consumer/': 'consumo',
  '/tourism/': 'turismo',
  '/others/': 'otros',
}

const MAX_AGE_DAYS = 365

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type LocalizedString {
      es: String!
      ca: String!
    }
    type SectorsYaml implements Node @dontInfer {
      key: String!
      order: Int!
      style: String
      slug: LocalizedString!
      name: LocalizedString!
      tagline: LocalizedString!
      heading: LocalizedString!
      banner: LocalizedString!
      note: LocalizedString
      image: File @fileByRelativePath
    }
    type Ibex35Yaml implements Node @dontInfer {
      name: String!
      sector: String!
      note: LocalizedString
    }
    type CompanyCta {
      url: String!
      referral: String
    }
    type CompaniesYaml implements Node @dontInfer {
      slug: String!
      name: String!
      sector: String!
      website: String!
      ownership: String!
      owner: String
      hq: String
      tags: [String!]!
      description: LocalizedString!
      warning: LocalizedString
      cta: CompanyCta!
      image: File @fileByRelativePath
      imageCredit: String
      imageSource: String
      lastVerified: Date! @dateformat
    }
    type ReferralsYaml implements Node @dontInfer {
      key: String!
      company: String!
      type: String!
      status: String!
      program: String
      url: String
      reward: String
      notes: String
    }
  `)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      sectors: allSectorsYaml(sort: { order: ASC }) {
        nodes {
          key
          slug {
            es
            ca
          }
        }
      }
      companies: allCompaniesYaml {
        nodes {
          slug
          name
          sector
          owner
          lastVerified
          cta {
            referral
          }
        }
      }
      ibex: allIbex35Yaml {
        nodes {
          name
          sector
        }
      }
      referrals: allReferralsYaml {
        nodes {
          key
          status
        }
      }
      pages: allMarkdownRemark {
        nodes {
          id
          frontmatter {
            slug
            lang
            alternate
            hidden
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('GraphQL query failed', result.errors)
    return
  }
  const { sectors, companies, ibex, referrals, pages } = result.data

  validate({ sectors, companies, ibex, referrals }, reporter)

  const sectorPath = (locale, sector) =>
    localizePath(locale, `/${sector.slug[locale]}/`)

  for (const locale of LOCALES) {
    const other = locale === 'es' ? 'ca' : 'es'
    const alternates = (pathFor) => ({ es: pathFor('es'), ca: pathFor('ca') })

    createPage({
      path: localizePath(locale, '/'),
      component: path.resolve('./src/templates/home.js'),
      context: { locale, alternates: alternates((l) => localizePath(l, '/')) },
    })

    createPage({
      path: localizePath(locale, `/${SLUGS[locale].directory}/`),
      component: path.resolve('./src/templates/directory.js'),
      context: {
        locale,
        alternates: alternates((l) =>
          localizePath(l, `/${SLUGS[l].directory}/`)
        ),
      },
    })

    createPage({
      path: localizePath(locale, `/${SLUGS[locale].cookies}/`),
      component: path.resolve('./src/templates/cookies.js'),
      context: {
        locale,
        alternates: alternates((l) => localizePath(l, `/${SLUGS[l].cookies}/`)),
      },
    })

    for (const sector of sectors.nodes) {
      createPage({
        path: sectorPath(locale, sector),
        component: path.resolve('./src/templates/sector.js'),
        context: {
          locale,
          sectorKey: sector.key,
          alternates: alternates((l) => sectorPath(l, sector)),
        },
      })
    }
  }

  // Markdown pages: one file per language, linked through frontmatter.alternate (slug in the other language)
  for (const page of pages.nodes) {
    const { slug, lang, alternate, hidden } = page.frontmatter
    if (!slug || !lang || hidden) continue
    const other = lang === 'es' ? 'ca' : 'es'
    createPage({
      path: localizePath(lang, `/${slug}/`),
      component: path.resolve('./src/templates/page.js'),
      context: {
        locale: lang,
        id: page.id,
        alternates: {
          [lang]: localizePath(lang, `/${slug}/`),
          [other]: localizePath(other, `/${alternate || slug}/`),
        },
      },
    })
  }

  // Legacy 2020 URLs: tiny pages with meta refresh (GitHub Pages has no server redirects)
  const byKey = Object.fromEntries(sectors.nodes.map((s) => [s.key, s]))
  for (const [oldPath, key] of Object.entries(LEGACY_PATHS)) {
    const sector = byKey[key]
    if (!sector) continue
    createPage({
      path: oldPath,
      component: path.resolve('./src/templates/redirect.js'),
      context: { to: sectorPath('es', sector) },
    })
  }
}

function validate({ sectors, companies, ibex, referrals }, reporter) {
  const problems = []
  const sectorKeys = new Set(sectors.nodes.map((s) => s.key))
  const ibexNames = ibex.nodes.map((n) => n.name.toLowerCase())
  const referralKeys = new Set(referrals.nodes.map((r) => r.key))
  const now = Date.now()

  for (const n of ibex.nodes) {
    if (!sectorKeys.has(n.sector))
      problems.push(`ibex35.yaml: ${n.name} has unknown sector "${n.sector}"`)
  }
  for (const c of companies.nodes) {
    if (!sectorKeys.has(c.sector))
      problems.push(`${c.slug}: unknown sector "${c.sector}"`)
    if (c.owner) {
      const hit = ibexNames.find((name) => c.owner.toLowerCase().includes(name))
      if (hit)
        problems.push(
          `${c.slug}: parent "${c.owner}" is an IBEX 35 company (${hit}); it cannot be listed`
        )
    }
    if (c.cta.referral && !referralKeys.has(c.cta.referral)) {
      problems.push(
        `${c.slug}: referral key "${c.cta.referral}" not found in referrals.yaml`
      )
    }
    const ageDays = (now - new Date(c.lastVerified).getTime()) / 86400000
    if (!(ageDays <= MAX_AGE_DAYS)) {
      problems.push(
        `${c.slug}: lastVerified ${c.lastVerified} is older than ${MAX_AGE_DAYS} days; re-check the company and bump the date`
      )
    }
  }

  if (problems.length) {
    const msg = `Content validation failed:\n  - ${problems.join('\n  - ')}`
    if (process.env.NODE_ENV === 'production') reporter.panicOnBuild(msg)
    else reporter.warn(msg)
  }
}
