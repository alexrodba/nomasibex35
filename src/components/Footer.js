import React from 'react'
import { Link } from 'gatsby'

const REPO = 'https://github.com/alexrodba/nomasibex35'

const Footer = () => (
  <footer id="footer">
    <div className="inner">
      <p>
        No Más IBEX 35 es un proyecto sin ánimo de lucro y de código abierto.
        Algunos enlaces son de afiliación: los ingresos cubren los gastos del
        sitio y el resto se dona a beneficencia.
      </p>
      <ul className="actions">
        <li>
          <a
            href={`${REPO}/issues/new?template=sugerir-empresa.yml`}
            className="button small"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sugerir una empresa
          </a>
        </li>
        <li>
          <a
            href={REPO}
            className="button small"
            target="_blank"
            rel="noopener noreferrer"
          >
            Código en GitHub
          </a>
        </li>
      </ul>
      <ul className="copyright">
        <li>
          <Link to="/">No Más IBEX 35</Link>
        </li>
        <li>
          Diseño: <a href="https://html5up.net">HTML5 UP</a>
        </li>
      </ul>
    </div>
  </footer>
)

export default Footer
