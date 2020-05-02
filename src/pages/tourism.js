import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BannerTourism from '../components/BannerTourism'

import pic01 from '../assets/images/wip.jpg'

const Tourism = (props) => (
    <Layout>
        <Helmet>
            <title>Alternativas al IBEX 35 en el sector turismo</title>
            <meta name="description" content="Alternativas al IBEX 35 en el sector turismo" />
        </Helmet>

        <BannerTourism />

        <div id="main">
            <section id="one">
                <div className="inner">
                    <header className="major">
                        <h2>Por un mundo más sostenible</h2>
                    </header>
                    <p>Las empresas del sector turismo e infrastructuras listadas en el IBEX 35 son las siguientes:</p>
                    <ul>
                        <li>Aena</li>
                        <li>Amadeus IT Group</li>
                        <li>Ferrovial</li>
                        <li>IAG</li>
                        <li>Meliá Hotels</li>
                    </ul>
                </div>
            </section>
            <section id="two" className="spotlights">
                <section>
                    <div className="image">
                        <img src={pic01} alt="Photo by Scott Graham on Unsplash" />
                    </div>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Sección en construcción</h3>
                            </header>
                            <p>Estamos trabajando en esta sección. Si eres una alternativa a las empresas del sector turismo del IBEX 35 y quieres que te listemos en esta sección, ponte en contacto con nosotros</p>
                            <ul className="actions">
                                <li><a href="https://nomasibex35.typeform.com/to/XCgczW" target="_blank" className="button">¡Escríbenos!</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </section>
        </div>

    </Layout>
)

export default Tourism