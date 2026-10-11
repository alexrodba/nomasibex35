import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/Seo'
import { CONSENT_KEY, DENIED, storeConsent } from '../lib/analytics'

const CookiesPage = () => (
  <Layout>
    <div id="main" className="alt">
      <section id="one">
        <div className="inner">
          <header className="major">
            <h1>Política de cookies</h1>
          </header>
          <p>
            Este sitio no usa cookies propias. Si aceptas el aviso que aparece
            en tu primera visita, cargamos Google Analytics 4, que instala
            cookies de medición (<code>_ga</code>, <code>_ga_*</code>) para
            contar visitas de forma agregada y con la IP anonimizada. Si lo
            rechazas, no se carga nada de Google y no se instala ninguna cookie.
          </p>
          <p>
            Tu elección se guarda en el almacenamiento local de tu navegador
            (clave <code>{CONSENT_KEY}</code>) para no volver a preguntarte.
            Puedes cambiarla aquí:
          </p>
          <ul className="actions">
            <li>
              <button
                type="button"
                className="button"
                onClick={() => {
                  storeConsent(DENIED)
                  window.location.reload()
                }}
              >
                Retirar el consentimiento
              </button>
            </li>
            <li>
              <button
                type="button"
                className="button"
                onClick={() => {
                  try {
                    window.localStorage.removeItem(CONSENT_KEY)
                  } catch (e) {
                    // ignore
                  }
                  window.location.reload()
                }}
              >
                Volver a preguntar
              </button>
            </li>
          </ul>
          <p>
            Los enlaces a empresas externas pueden llevar parámetros de
            afiliación; al hacer clic sales de este sitio y se aplican las
            políticas de la empresa de destino.
          </p>
        </div>
      </section>
    </div>
  </Layout>
)

export default CookiesPage

export const Head = () => (
  <Seo
    title="Política de cookies"
    description="Qué cookies usa No Más IBEX 35 y cómo cambiar tu elección."
    pathname="/cookies/"
  />
)
