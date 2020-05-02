import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BannerOthers from '../components/BannerOthers'

import pic01 from '../assets/images/wip.jpg'

const Others = (props) => (
    <Layout>
        <Helmet>
            <title>Alternativas al IBEX 35 en otros sectores</title>
            <meta name="description" content="Alternativas al IBEX 35 en otros sectores" />
        </Helmet>

        <BannerOthers />

        <div id="main">
            <section id="one">
                <div className="inner">
                    <header className="major">
                        <h2>Resto de empresas del IBEX 35 no listadas en las otras categorías</h2>
                    </header>
                    <p>El resto de empresas listadas en el IBEX 35, que no encaja en ninguna de las otras categorías, son las siguientes:</p>
                    <ul>
                        <li>Acerinox (Sector Metalurgia)</li>
                        <li>ArcelorMittal (Sector Metalurgia)</li>
                        <li>ENCE (Sector Industrial)</li>
                        <li>Grífols (Sector Farmacéutico)</li>
                        <li>Viscofan (Sector Industrial)</li>
                    </ul>
                </div>
            </section>
            <section id="two" className="spotlights">
                <section>
                    <Link to="#" className="image">
                        <img src={pic01} alt="Photo by Scott Graham on Unsplash" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Sección en construcción</h3>
                            </header>
                            <p>Estamos trabajando en esta sección. Si eres una alternativa a las empresas del IBEX 35, no encajas en ninguna de las categorías anteriores, y quieres que te listemos en esta sección, ponte en contacto con nosotros</p>
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

export default Others