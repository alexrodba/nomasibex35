import React, { useEffect, useState } from 'react'

import '@fontsource/source-sans-3/latin-300.css'
import '@fontsource/source-sans-3/latin-300-italic.css'
import '@fontsource/source-sans-3/latin-600.css'
import '@fontsource/source-sans-3/latin-600-italic.css'
import '../assets/scss/main.scss'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'
import ConsentBanner from './ConsentBanner'
import { DEFAULT_LOCALE } from '../i18n'

const Layout = ({ children, locale = DEFAULT_LOCALE, alternates }) => {
  const [isMenuVisible, setMenuVisible] = useState(false)
  const [loading, setLoading] = useState('is-loading')

  useEffect(() => {
    // Let the first paint happen with the "is-loading" class so the banner
    // transitions in, then remove it.
    const id = window.requestAnimationFrame(() => setLoading(''))
    return () => window.cancelAnimationFrame(id)
  }, [])

  const toggleMenu = () => setMenuVisible((v) => !v)

  return (
    <div
      className={`body ${loading} ${isMenuVisible ? 'is-menu-visible' : ''}`}
    >
      <div id="wrapper">
        <Header
          locale={locale}
          alternates={alternates}
          onToggleMenu={toggleMenu}
        />
        {children}
        <Footer locale={locale} />
      </div>
      <Menu
        locale={locale}
        onToggleMenu={toggleMenu}
        isVisible={isMenuVisible}
      />
      <ConsentBanner locale={locale} />
    </div>
  )
}

export default Layout
