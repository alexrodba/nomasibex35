import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BannerTelcos from '../components/BannerTelcos'

import pic01 from '../assets/images/telcos/1.jpg'
import pic02 from '../assets/images/telcos/2.jpg'
import pic03 from '../assets/images/telcos/3.jpg'

const Telcos = (props) => (
    <Layout>
        <Helmet>
            <title>Alternativas al IBEX 35 en el sector telecomunicaciones</title>
            <meta name="description" content="Alternativas al IBEX 35 en el sector telecomunicaciones" />
        </Helmet>

        <BannerTelcos />

        <div id="main">
            <section id="one">
                <div className="inner">
                    <header className="major">
                        <h2>Somos tu voz</h2>
                    </header>
                    <p>Las empresas de telecomunicaciones listadas en el IBEX 35 son las siguientes:</p>
                    <ul>
                        <li>Cellnex Telecom</li>
                        <li>Telefónica</li>
                    </ul>
                    <p>Las empresas alternativas que proponemos son las siguientes:</p>
                </div>
            </section>
            <section id="two" className="spotlights">
                <section>
                    <div className="image">
                        <img src={pic01} alt="Photo by Lance Anderson on Unsplash" />
                    </div>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Digi</h3>
                            </header>
                            <p>Digi es una empresa de teléfono y fibra (internet) para los que en su momento se enamoraron de PepePhone: sin trucos, precios transparentes, sin letra pequeña y con lenguaje claro y próximo.</p>
                            <ul className="actions">
                                <li><a href="https://tienda.digimobil.es/?utm_source=web&utm_medium=nomasibex35&utm_campaign=singup_link&utm_content=CTA_signup" target="_blank" className="button">Date de alta</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="image">
                        <img src={pic02} alt="Photo by ThisisEngineering RAEng on Unsplash" />
                    </div>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Euskaltel</h3>
                            </header>
                            <p>Euskaltel dispone de la mayor red de fibra óptica de Euskadi, con unos 350.000 kilómetros instalados y es el líder en País Vasco con 216.846 clientes, un 41% de cuota de mercado en banda ancha.</p>
                            <ul className="actions">
                                <li><a href="https://www.euskaltel.com/particulares/ayuda/tengo-dudas-sobre/soporte/contacto/telefonos-de-contacto-clientes-particulares" target="_blank" className="button">Date de alta</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="image">
                        <img src={pic03} alt="Photo by Hal Gatewood on Unsplash" />
                    </div>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Parlem</h3>
                            </header>
                            <p>Parlem es una operadora móvil virtual con sede en Barcelona constituida en julio de 2014 y fundada por el ingeniero de telecomunicaciones Ernest Pérez-Mas, ejecutivo y principal accionista. El nombre completo de la sociedad limitada es Parlem Telecom Compañía de Telecomunicaciones SL.</p>
                            <ul className="actions">
                                <li><a href="https://parlem.com/contactans" target="_blank" className="button">Date de alta</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </section>
        </div>

    </Layout>
)

export default Telcos