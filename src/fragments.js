import { graphql } from 'gatsby'

export const companyFields = graphql`
  fragment CompanyFields on CompaniesYaml {
    slug
    name
    sector
    website
    ownership
    owner
    hq
    tags
    lastVerified(formatString: "YYYY-MM-DD")
    description {
      es
      ca
    }
    warning {
      es
      ca
    }
    cta {
      url
      referral
    }
    imageCredit
    imageSource
    image {
      childImageSharp {
        gatsbyImageData(
          width: 420
          height: 315
          layout: CONSTRAINED
          formats: [AUTO, WEBP]
          quality: 58
          breakpoints: [210, 420, 630]
        )
      }
    }
  }
`
