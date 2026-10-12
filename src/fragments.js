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
    image {
      childImageSharp {
        gatsbyImageData(
          width: 640
          height: 480
          layout: CONSTRAINED
          formats: [AUTO, WEBP]
        )
      }
    }
  }
`
