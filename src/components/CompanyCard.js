import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import AffiliateLink from './AffiliateLink'
import { TagList } from './TagBadge'
import { getDictionary, pick } from '../i18n'

/** Spotlight-style row used on sector pages and the directory. */
const CompanyCard = ({ company, referral, locale, showSector }) => {
  const t = getDictionary(locale)
  const image = company.image && getImage(company.image)
  const isAffiliate = Boolean(
    referral && referral.status === 'approved' && referral.url
  )
  return (
    <section id={company.slug} className="company">
      <div className={`image ${image ? '' : 'placeholder'}`}>
        {image ? (
          <GatsbyImage
            image={image}
            alt={company.imageCredit || company.name}
          />
        ) : (
          <span aria-hidden="true">{company.name.charAt(0)}</span>
        )}
      </div>
      <div className="content">
        <div className="inner">
          <header className="major">
            <h3>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
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
