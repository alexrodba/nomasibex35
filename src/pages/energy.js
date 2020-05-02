import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BannerEnergy from '../components/BannerEnergy'

import pic08 from '../assets/images/energy/hola.jpg'
import pic09 from '../assets/images/energy/som.jpg'
import pic10 from '../assets/images/energy/sole.jpg'

const Energy = (props) => (
    <Layout>
        <Helmet>
            <title>Alternativas al IBEX 35 en el sector energético</title>
            <meta name="description" content="Alternativas al IBEX 35 en el sector energético" />
        </Helmet>

        <BannerEnergy />

        <div id="main">
            <section id="one">
                <div className="inner">
                    <header className="major">
                        <h2>El poder, para el pueblo</h2>
                    </header>
                    <p>Las empresas energéticas listadas en el IBEX 35 son las siguientes:</p>
                    <ul>
                        <li>ENAGAS</li>
                        <li>Endesa</li>
                        <li>Iberdrola</li>
                        <li>Naturgy (ex-Gas Natural)</li>
                        <li>Red Eléctrica de España</li>
                        <li>Repsol</li>
                        <li>Siemens Gamesa</li>
                    </ul>
                    <p>Las empresas alternativas que proponemos son las siguientes:</p>
                </div>
            </section>
            <section id="two" className="spotlights">
                <section>
                    <div className="image">
                        <img src={pic08} alt="" />
                    </div>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>HolaLuz</h3>
                            </header>
                            <p>HolaLuz vende solamente energía 100% de origen renovable. Gracias al uso de la tecnología, HolaLuz ofrece productos personalizados y tarifas que te permiten ahorrar. Además, su cultura de trato de clientes es excepcional y te hacen sentir importante.</p>
                            <ul className="actions">
                                <li><a href="https://alta.holaluz.com/es/" target="_blank" className="button">Date de alta</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="image">
                        <img src={pic09} alt="" />
                    </div>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Som Energia</h3>
                            </header>
                            <p>Som Energia es una cooperativa de consumo de energía verde sin ánimo de lucro. Sus actividades principales son la comercialización y la producción de energía de origen renovable. Comprometidos a impulsar un cambio de modelo energético actual para alcanzar un modelo 100% renovable.</p>
                            <ul className="actions">
                                <li><a href="https://www.somenergia.coop/es/hazte-socio-a/" target="_blank" className="button">Date de alta</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="image">
                        <img src={pic10} alt="" />
                    </div>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>EnergÉtica</h3>
                            </header>
                            <p>EnergÉtica es una cooperativa de consumidores sin ánimo de lucro de energía 100% renovable. Comercializan electricidad de mínimo impacto ambiental a la par que te forman en eficiencia energética y autoconsumo.</p>
                            <ul className="actions">
                                <li><a href="https://www.energetica.coop/hazte-cooperativista/" target="_blank" className="button">Date de alta</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </section>
        </div>

    </Layout>
)

export default Energy