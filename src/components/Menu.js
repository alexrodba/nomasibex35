import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { getDictionary, localizePath, pick } from '../i18n'

const Menu = ({ locale, onToggleMenu, isVisible }) => {
  const t = getDictionary(locale)
  const data = useStaticQuery(graphql`
    query MenuSectors {
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
    }
  `)
  const items = [
    [localizePath(locale, '/'), t.nav.home],
    ...data.allSectorsYaml.nodes.map((s) => [
      localizePath(locale, `/${pick(s.slug, locale)}/`),
      pick(s.name, locale),
    ]),
    [localizePath(locale, `/${t.slugs.directory}/`), t.nav.directory],
    [localizePath(locale, `/${t.slugs.about}/`), t.nav.about],
  ]

  return (
    <nav id="menu" aria-hidden={!isVisible}>
      <div className="inner">
        <ul className="links">
          {items.map(([to, label]) => (
            <li key={to}>
              <Link onClick={onToggleMenu} to={to}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <a
        className="close"
        href="#menu"
        role="button"
        onClick={(e) => {
          e.preventDefault()
          onToggleMenu()
        }}
      >
        {t.nav.close}
      </a>
    </nav>
  )
}

Menu.propTypes = {
  locale: PropTypes.string.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
}

export default Menu
