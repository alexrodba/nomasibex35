module.exports = {
  siteMetadata: {
    title: 'No Más IBEX 35',
    siteUrl: 'https://nomasibex35.com',
    description:
      'No Más IBEX 35 es un sitio web sin ánimo de lucro que proporciona información pública a quien quiera encontrar otras opciones a las empresas listadas en el IBEX 35. Algunos de los enlaces a las empresas alternativas son de afiliación y reportan unos ingresos a No Más IBEX 35. Usaremos estos ingresos para cubrir los gastos básicos de este sitio web y el resto lo donaremos a beneficencia.',
    defaultLang: 'es',
    languages: ['es', 'ca'],
    repository: 'https://github.com/alexrodba/nomasibex35',
    ga4Id: process.env.GATSBY_GA4_ID || '',
  },
  trailingSlash: 'always',
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'images', path: `${__dirname}/src/assets/images` },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'data', path: `${__dirname}/src/data` },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions: { silenceDeprecations: ['legacy-js-api'] },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'No Más IBEX 35',
        short_name: 'No Más IBEX 35',
        description: 'Alternativas a las empresas del IBEX 35',
        lang: 'es',
        start_url: '/',
        background_color: '#242943',
        theme_color: '#242943',
        display: 'minimal-ui',
        icon: 'src/assets/images/website-icon.png',
        // favicon.ico + favicon.svg are linked in gatsby-ssr.js; keep the manifest's PNGs for app icons
        include_favicon: false,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/offline-plugin-app-shell-fallback/'],
      },
    },
  ],
}
