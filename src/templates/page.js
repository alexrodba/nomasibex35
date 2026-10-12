import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/Seo'

const MarkdownPage = ({ data, pageContext }) => {
  const { locale, alternates } = pageContext
  const { frontmatter, html } = data.markdownRemark
  return (
    <Layout locale={locale} alternates={alternates}>
      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <header className="major">
              <h1>{frontmatter.title}</h1>
            </header>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default MarkdownPage

export const Head = ({ data, pageContext }) => {
  const { locale, alternates } = pageContext
  const { frontmatter } = data.markdownRemark
  return (
    <Seo
      title={frontmatter.title}
      description={frontmatter.description}
      locale={locale}
      pathname={alternates[locale]}
      alternates={alternates}
    />
  )
}

export const query = graphql`
  query MarkdownPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`
