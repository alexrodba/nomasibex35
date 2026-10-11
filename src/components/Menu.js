import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const links = [
  ['/', 'Inicio'],
  ['/energy/', 'Energéticas'],
  ['/banking/', 'Banca'],
  ['/telcos/', 'Telefónicas'],
  ['/realestate/', 'Inmobiliarias'],
  ['/services/', 'Servicios'],
  ['/consumer/', 'Consumo'],
  ['/tourism/', 'Turismo'],
  ['/others/', 'Otros'],
]

const Menu = ({ onToggleMenu, isVisible }) => (
  <nav id="menu" aria-hidden={!isVisible}>
    <div className="inner">
      <ul className="links">
        {links.map(([to, label]) => (
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
      Cerrar
    </a>
  </nav>
)

Menu.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
}

export default Menu
