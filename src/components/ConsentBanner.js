import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import {
  DENIED,
  getStoredConsent,
  GRANTED,
  loadAnalytics,
  storeConsent,
} from '../lib/analytics'

const GA4_ID = process.env.GATSBY_GA4_ID || ''

const ConsentBanner = () => {
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
      aria-label="Aviso de cookies"
    >
      <p>
        Usamos Google Analytics para saber qué secciones se visitan más. Solo se
        activa si aceptas. <Link to="/cookies/">Más información</Link>.
      </p>
      <ul className="actions">
        <li>
          <button
            type="button"
            className="button"
            onClick={() => decide(DENIED)}
          >
            Rechazar
          </button>
        </li>
        <li>
          <button
            type="button"
            className="button special"
            onClick={() => decide(GRANTED)}
          >
            Aceptar
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ConsentBanner
