import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import AffiliateLink from './AffiliateLink'
import { TagList } from './TagBadge'
import { getDictionary, pick } from '../i18n'
import { trackEvent } from '../lib/analytics'
import { withUtm } from '../lib/utm'

/** "Som Energia" -> "SE", "Digi" -> "DI", "Bonpreu / Esclat" -> "BE". */
function initials(name) {
  const words = name
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w && !/^(de|del|la|el|y|i|d)$/i.test(w))
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return (words[0] || name).slice(0, 2).toUpperCase()
}

/** Spotlight-style row used on sector pages and the directory. */
const CompanyCard = ({ company, referral, locale, page = 'sector' }) => {
  const t = getDictionary(locale)
  const image = company.image && getImage(company.image)
  const isAffiliate = Boolean(
    referral && referral.status === 'approved' && referral.url
  )
  return (
    <section id={company.slug} className="company">
      <div
        className={`image ${image ? '' : `placeholder sector-${company.sector}`}`}
      >
        {image ? (
          <GatsbyImage image={image} alt="" />
        ) : (
          <span className="initials" aria-hidden="true">
            {initials(company.name)}
          </span>
        )}
      </div>
      <div className="content">
        <div className="inner">
          <header className="major">
            <h3>
              <a
                href={withUtm(company.website, {
                  campaign: company.sector,
                  page,
                  placement: 'name',
                  locale,
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('outbound_click', {
                    company: company.slug,
                    sector: company.sector,
                    placement: 'name',
                  })
                }
              >
                {company.name}
              </a>
            </h3>
          </header>
          <TagList
            tags={company.tags}
            affiliate={isAffiliate}
            locale={locale}
          />
          <p>{pick(company.description, locale)}</p>
          {company.warning && (
            <p className="company-warning">
              <strong>{t.sector.warning}:</strong>{' '}
              {pick(company.warning, locale)}
            </p>
          )}
          <dl className="company-meta">
            {company.owner && (
              <>
                <dt>{t.sector.ownedBy}</dt>
                <dd>{company.owner}</dd>
              </>
            )}
            {company.hq && (
              <>
                <dt>{t.sector.hq}</dt>
                <dd>{company.hq}</dd>
              </>
            )}
            {image && company.imageCredit && (
              <>
                <dt>{t.sector.photo}</dt>
                <dd className="photo-credit">
                  {company.imageSource ? (
                    <a
                      href={company.imageSource}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.imageCredit}
                    </a>
                  ) : (
                    company.imageCredit
                  )}
                </dd>
              </>
            )}
            <dt>{t.sector.verified}</dt>
            <dd>
              <time dateTime={company.lastVerified}>
                {company.lastVerified}
              </time>
            </dd>
          </dl>
          <ul className="actions">
            <li>
              <AffiliateLink
                href={company.cta.url}
                referral={referral}
                company={company.slug}
                sector={company.sector}
                locale={locale}
                page={page}
              >
                {t.sector.signup}
              </AffiliateLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default CompanyCard
