import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/Seo'

const NotFoundPage = () => (
  <Layout>
    <div id="main" className="alt">
      <section id="one">
        <div className="inner">
          <h1>PÁGINA NO ENCONTRADA</h1>
          <p>Esta página no existe (de momento).</p>
        </div>
      </section>
    </div>
  </Layout>
)

export default NotFoundPage

export const Head = () => <Seo title="Página no encontrada" pathname="/404/" />
