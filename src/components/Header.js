import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Header = ({ onToggleMenu }) => (
  <header id="header" className="alt">
    <Link to="/" className="logo">
      <span>NO MÁS</span> <strong>IBEX 35</strong>
    </Link>
    <nav>
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
        Menú
      </a>
    </nav>
  </header>
)

Header.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
}

export default Header
