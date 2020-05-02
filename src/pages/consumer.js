import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BannerConsumer from '../components/BannerConsumer'

import pic01 from '../assets/images/wip.jpg'

const Consumer = (props) => (
    <Layout>
        <Helmet>
            <title>Alternativas al IBEX 35 en el sector consumo</title>
            <meta name="description" content="Alternativas al IBEX 35 en el sector consumo" />
        </Helmet>

        <BannerConsumer />

        <div id="main">
            <section id="one">
                <div className="inner">
                    <header className="major">
                        <h2>Mirad la etiqueta antes de comprar</h2>
                    </header>
                    <p>Las empresas del sector consumo (moda, entretenimiento, automóvil) listadas en el IBEX 35 son las siguientes:</p>
                    <ul>
                        <li>CIE Automotive</li>
                        <li>Inditex</li>
                        <li>Mediaset España</li>
                    </ul>
                </div>
            </section>
            <section id="two" className="spotlights">
                <section>
                    <Link to="/" className="image">
                        <img src={pic01} alt="Photo by Scott Graham on Unsplash" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Sección en construcción</h3>
                            </header>
                            <p>Estamos trabajando en esta sección. Si eres una alternativa a las empresas del sector consumo del IBEX 35 y quieres que te listemos en esta sección, ponte en contacto con nosotros</p>
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

export default Consumer