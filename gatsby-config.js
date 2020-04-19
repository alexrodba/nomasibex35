module.exports = {
  siteMetadata: {
    title: "No Más IBEX 35",
    author: "Antoni Mon",
    description: "No Más IBEX 35 es un sitio web sin ánimo de lucro que proporciona información pública a quien quiera encontrar otras opciones a las empresas listadas en el IBEX 35. Algunos de los enlaces a las empresas alternativas son de afiliación y reportan unos ingresos económicos a No Más IBEX 35. Usaremos estos ingresos para cubrir los gastos básicos de este sitio web y el resto lo donaremos a beneficiencia."
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/images/website-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline'
  ],
}
