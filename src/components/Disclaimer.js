import React from 'react'
import { getDictionary } from '../i18n'

/** Shown under every list of companies. */
const Disclaimer = ({ locale }) => (
  <section className="disclaimer">
    <div className="inner">
      <p>{getDictionary(locale).sector.disclaimer}</p>
    </div>
  </section>
)

export default Disclaimer
