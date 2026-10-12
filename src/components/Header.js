import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { getDictionary, localizePath, otherLocale } from '../i18n'

const Header = ({ locale, alternates, onToggleMenu }) => {
  const t = getDictionary(locale)
  const other = otherLocale(locale)
  const otherPath =
    (alternates && alternates[other]) || localizePath(other, '/')
  return (
    <header id="header" className="alt">
      <Link to={localizePath(locale, '/')} className="logo">
        <span>{locale === 'ca' ? 'NO MÉS' : 'NO MÁS'}</span>{' '}
        <strong>IBEX 35</strong>
      </Link>
      <nav>
        <Link
          to={otherPath}
          className="lang-switch"
          hrefLang={other}
          lang={other}
          aria-label={`${t.nav.languageLabel}: ${t.switchTo}`}
          title={t.switchTo}
        >
          {getDictionary(other).short}
        </Link>
        <a
          className="menu-link"
          href="#menu"
          role="button"
          aria-controls="menu"
          onClick={(e) => {
            e.preventDefault()
            onToggleMenu()
          }}
        >
          {t.nav.menu}
        </a>
      </nav>
    </header>
  )
}

Header.propTypes = {
  locale: PropTypes.string.isRequired,
  alternates: PropTypes.object,
  onToggleMenu: PropTypes.func.isRequired,
}

export default Header
