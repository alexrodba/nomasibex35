import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BannerServices from '../components/BannerServices'

import pic01 from '../assets/images/wip.jpg'

const Services = (props) => (
    <Layout>
        <Helmet>
            <title>Alternativas al IBEX 35 en el sector servicios</title>
            <meta name="description" content="Alternativas al IBEX 35 en el sector servicios" />
        </Helmet>

        <BannerServices />

        <div id="main">
            <section id="one">
                <div className="inner">
                    <header className="major">
                        <h2>Sirviendo, por un mundo mejor</h2>
                    </header>
                    <p>Las empresas del sector servicios listadas en el IBEX 35 son las siguientes:</p>
                    <ul>
                        <li>Indra</li>
                        <li>Mapfre</li>
                        <li>Técnicas Reunidas</li>
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
                            <p>Estamos trabajando en esta sección. Si eres una alternativa a las empresas del sector servicios del IBEX 35 y quieres que te listemos en esta sección, ponte en contacto con nosotros</p>
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

export default Services