import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core' 
import Layout from '../components/Layout' 
import { useTheme } from '../components/Theming'  
import RobotStarsSceneNew from "../components/basics/robots/robotscenemainpage"  
  
const Hero = () => {
  const theme = useTheme()
  return (
    <section
      css={css`
        color: ${theme.colors.white};
        width: 100%;
        height: 100%; 
        background: ${theme.colors.primary};
        padding: 0px 0 0px 0;
        display: flex;
      `}
    > 
      <div
        css={css`
          height: 100%;  
          width: 100%;
          background: ${theme.colors.blue};
          overflow: hidden;
        `}
      >
        <RobotStarsSceneNew/> 
      </div>
    </section>
  )
}

 
export default function Index({ data: { site, allMdx } }) {
  const theme = useTheme()
  return (
    <Layout noSubscribeForm noFooter site={site}> 
      <Hero />   
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            slug
            keywords
          }
        }
      }
    }
  }
`
