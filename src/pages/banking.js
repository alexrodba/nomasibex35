import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BannerLanding from '../components/BannerEnergy'

import pic01 from '../assets/images/banking/1.jpg'
import pic02 from '../assets/images/banking/2.jpg'
import pic03 from '../assets/images/banking/3.jpg'

const Landing = (props) => (
    <Layout>
        <Helmet>
            <title>Landing - Forty by HTML5 UP</title>
            <meta name="description" content="Landing Page" />
        </Helmet>

        <BannerLanding />

        <div id="main">
            <section id="one">
                <div className="inner">
                    <header className="major">
                        <h2>Dinero ético es dinero límpio</h2>
                    </header>
                    <p>Las empresas de banca listadas en el IBEX 35 son las siguientes:</p>
                    <ul>
                        <li>Banco Sabadell</li>
                        <li>Banco Santander</li>
                        <li>Bankia</li>
                        <li>Bankinter</li>
                        <li>BBVA</li>
                        <li>CaixaBank</li>
                    </ul>
                    <p>Las empresas alternativas que proponemos son las siguientes:</p>
                </div>
            </section>
            <section id="two" className="spotlights">
                <section>
                    <Link to="https://www.fiarebancaetica.coop/cuenta-etica" className="image">
                        <img src={pic01} alt="Photo by Micheile Henderson on Unsplash" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Fiare Banca Etica</h3>
                            </header>
                            <p>Fiare Banca Etica nace de la unión de dos proyectos basados en las finanzas éticas: Banca Popolare Etica, un banco cooperativo que trabaja en Italia desde el 1999 y Fiare que opera en España desde el 2005. Ambos quieren ser una herramienta al servicio de la transformación social a través de la financiación de proyectos del tercer sector, la economía social y solidaria y la promoción de una cultura de la intermediación financiera, bajo los principios de la transparencia, la participación y la democracia.</p>
                            <ul className="actions">
                                <li><a href="https://www.fiarebancaetica.coop/cuenta-etica" target="_blank" className="button">Date de alta</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="/generic" className="image">
                        <img src={pic02} alt="Photo by ThisisEngineering RAEng on Unsplash" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Caixa d'Enginyers</h3>
                            </header>
                            <p>Caja de Ingenieros es una sociedad cooperativa de ahorro y crédito que cuenta con más de 200.000 socios y desarrolla un modelo de banca personal, comercial, institucional y de empresa en el territorio español con la vocación de prestar servicio a los profesionales, ya sean ingenieros o de otras profesiones.</p>
                            <ul className="actions">
                                <li><a href="https://www.caixaenginyers.com/es/soci-cooperatiu" target="_blank" className="button">Date de alta</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="/generic" className="image">
                        <img src={pic03} alt="Photo by Alicia Perez on Unsplash" />
                    </Link>
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

export default Landing