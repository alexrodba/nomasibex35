import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Banner from '../components/Banner'

import pic01 from '../assets/images/energy.jpg'
import pic02 from '../assets/images/bank.jpg'
import pic03 from '../assets/images/phone.jpg'
import pic04 from '../assets/images/travel.jpg'
import pic05 from '../assets/images/realestate.jpg'
import pic06 from '../assets/images/services.jpg'
import pic07 from '../assets/images/shopping.jpg'
import pic08 from '../assets/images/boxes.jpg'

class HomeIndex extends React.Component {
    render() {

        return (
            <Layout>
                <Helmet
                    title="No Más IBEX 35"
                    meta={[
                        { name: 'description', content: 'No Más IBEX 35 es un sitio web sin ánimo de lucro que proporciona información pública a quien quiera encontrar otras opciones a las empresas listadas en el IBEX 35' },
                        { name: 'keywords', content: 'ibex, ibex35, energia, telefonia, energeticas, telefónicas, banca ética, holaluz, autoconsumo, energías renovables, ética empresarial' },
                    ]}
                >
                </Helmet>

                <Banner />

                <div id="main">
                    <section id="one" className="tiles">
                        <article style={{backgroundImage: `url(${pic01})`}}>
                            <header className="major">
                                <h3>Energéticas</h3>
                                <p>Poder para el pueblo</p>
                            </header>
                            <Link to="/energeticas" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic02})`}}>
                            <header className="major">
                                <h3>Banca</h3>
                                <p>Dinero ético es dinero limpio</p>
                            </header>
                            <Link to="/" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic03})`}}>
                            <header className="major">
                                <h3>Telefónicas</h3>
                                <p>Somos tu voz</p>
                            </header>
                            <Link to="/" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic05})`}}>
                            <header className="major">
                                <h3>Immobiliarias</h3>
                                <p>Casas para la gente</p>
                            </header>
                            <Link to="/" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic06})`}}>
                            <header className="major">
                                <h3>Servicios</h3>
                                <p>TODO</p>
                            </header>
                            <Link to="/" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic07})`}}>
                            <header className="major">
                                <h3>Consumo</h3>
                                <p>Mirad la etiqueta antes de comprar</p>
                            </header>
                            <Link to="/" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic04})`}}>
                            <header className="major">
                                <h3>Turismo</h3>
                                <p>Por un mundo más sostenible</p>
                            </header>
                            <Link to="/" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic08})`}}>
                            <header className="major">
                                <h3>Otros</h3>
                                <p>Difíciles de clasificar</p>
                            </header>
                            <Link to="/" className="link primary"></Link>
                        </article>
                    </section>
                    <section id="two">
                        <div className="inner">
                            <header className="major">
                                <h2>Todas las empresas</h2>
                            </header>
                            <p>No Más IBEX 35 es un sitio web sin ánimo de lucro que proporciona información pública a quien quiera encontrar otras opciones a las empresas listadas en el IBEX 35. Algunos de los enlaces a las empresas alternativas son de afiliación y reportan unos ingresos económicos a No Más IBEX 35. Usaremos estos ingresos para cubrir los gastos básicos de este sitio web y el resto lo donaremos a beneficiencia.</p>
                            <ul className="actions">
                                <li><Link to="/landing" className="button next">Ver todas las empresas</Link></li>
                            </ul>
                        </div>
                    </section>
                </div>

            </Layout>
        )
    }
}

export default HomeIndex