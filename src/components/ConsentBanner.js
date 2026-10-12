import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import {
  DENIED,
  getStoredConsent,
  GRANTED,
  loadAnalytics,
  storeConsent,
} from '../lib/analytics'
import { getDictionary, localizePath } from '../i18n'

const GA4_ID = process.env.GATSBY_GA4_ID || ''

const ConsentBanner = ({ locale }) => {
  const t = getDictionary(locale)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (GA4_ID && !getStoredConsent()) setVisible(true)
  }, [])

  if (!visible) return null

  const decide = (value) => {
    storeConsent(value)
    setVisible(false)
    if (value === GRANTED) loadAnalytics(GA4_ID)
  }

  return (
    <div
      className="consent-banner"
      role="dialog"
      aria-live="polite"
      aria-label={t.consent.label}
    >
      <p>
        {t.consent.text}{' '}
        <Link to={localizePath(locale, `/${t.slugs.cookies}/`)}>
          {t.consent.more}
        </Link>
        .
      </p>
      <ul className="actions">
        <li>
          <button
            type="button"
            className="button"
            onClick={() => decide(DENIED)}
          >
            {t.consent.reject}
          </button>
        </li>
        <li>
          <button
            type="button"
            className="button special"
            onClick={() => decide(GRANTED)}
          >
            {t.consent.accept}
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ConsentBanner
