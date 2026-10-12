import React from 'react'
import PropTypes from 'prop-types'
import { trackEvent } from '../lib/analytics'
import { getDictionary } from '../i18n'

/**
 * Outbound CTA. When `referral` is an approved programme, the link is marked
 * as sponsored, labelled as an affiliate link (LSSI art. 20) and tracked.
 */
const AffiliateLink = ({
  href,
  referral,
  company,
  sector,
  locale,
  className = 'button',
  children,
}) => {
  const t = getDictionary(locale)
  const isAffiliate = Boolean(
    referral && referral.status === 'approved' && referral.url
  )
  const url = isAffiliate ? referral.url : href
  const onClick = () =>
    trackEvent(isAffiliate ? 'affiliate_click' : 'outbound_click', {
      company,
      sector,
      programme: isAffiliate ? referral.key : undefined,
    })
  return (
    <>
      <a
        href={url}
        className={className}
        target="_blank"
        rel={
          isAffiliate ? 'sponsored nofollow noopener' : 'noopener noreferrer'
        }
        onClick={onClick}
        title={isAffiliate ? t.sector.affiliateTitle : undefined}
      >
        {children}
      </a>
      {isAffiliate && (
        <span className="affiliate-note" title={t.sector.affiliateTitle}>
          {t.sector.affiliate}
        </span>
      )}
    </>
  )
}

AffiliateLink.propTypes = {
  href: PropTypes.string.isRequired,
  referral: PropTypes.shape({
    key: PropTypes.string,
    status: PropTypes.string,
    url: PropTypes.string,
  }),
  company: PropTypes.string,
  sector: PropTypes.string,
  locale: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default AffiliateLink
