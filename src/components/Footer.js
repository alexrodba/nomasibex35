import React from 'react'
import { Link } from 'gatsby'
import { getDictionary, localizePath, REPO, SUGGEST_URL } from '../i18n'

const Footer = ({ locale }) => {
  const t = getDictionary(locale)
  const legal = [
    ['about', t.nav.about],
    ['cookies', 'Cookies'],
  ]
  return (
    <footer id="footer">
      <div className="inner">
        <p>{t.footer.text}</p>
        <ul className="actions">
          <li>
            <a
              href={SUGGEST_URL}
              className="button small"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footer.suggest}
            </a>
          </li>
          <li>
            <a
              href={REPO}
              className="button small"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footer.code}
            </a>
          </li>
        </ul>
        <ul className="copyright">
          <li>
            <Link to={localizePath(locale, '/')}>No Más IBEX 35</Link>
          </li>
          {legal.map(([key, label]) => (
            <li key={key}>
              <Link to={localizePath(locale, `/${t.slugs[key]}/`)}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            {t.footer.design}: <a href="https://html5up.net">HTML5 UP</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
