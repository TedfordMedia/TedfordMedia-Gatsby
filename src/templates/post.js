import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import SEO from 'components/SEO'
import { css } from '@emotion/core'
import Container from '../components/Container'
import Layout from '../components/Layout'
import { fonts } from '../lib/typography'
import Share from '../components/Share'
import config from '../../config/website'
import { bpMaxSM } from '../lib/breakpoints'
 

export default function Post({
  data: { site, mdx },
  pageContext: { next, prev },
}) {
  const author = mdx.frontmatter.author || config.author
  const date = mdx.frontmatter.date
  const title = mdx.frontmatter.title
  const banner = mdx.frontmatter.banner
 
  let featuredImage = mdx.frontmatter.featuredImage
  let featuredScene = mdx.frontmatter.featuredScene
 
  // let featuredImageCaption = mdx.frontmatter.featuredImageCaption
  // let featuredImagePath = null
  let featuredImageFluid = null 
  if (featuredImage) {
    featuredImageFluid = featuredImage.childImageSharp.fluid
    // featuredImagePath = featuredImageFluid.src
  }
 
  return (
    <Layout noSubscribeForm site={site} frontmatter={mdx.frontmatter}>
      <SEO frontmatter={mdx.frontmatter} isBlogPost />
      <article
        css={css`
          width: 100%; 
          display: flex;
        `}
      >
        <Container>
          <h1
            css={css`
              text-align: center;
              margin-bottom: 10px;
            `}
          >
            {title}
          </h1>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-bottom: 0px;
              h3,
              span {
                text-align: center;
                font-size: 15px;
                opacity: 0.6;
                font-family: ${fonts.regular}, sans-serif;
                font-weight: normal;
                margin: 0 5px;
              }
            `}
          >
            {author && <h3>{author}</h3>}
            {author && <span>—</span>}
            {date && <h3>{date}</h3>}
          </div>
          {banner && (
            <div
              css={css`
                padding: 30px;
                padding-bottom: 5px;
                ${bpMaxSM} {
                  padding: 0;
                }
              `}
            >
              {/* <Img
                sizes={banner.childImageSharp.fluid}
                alt={site.siteMetadata.keywords.join(', ')}
              /> */}
               {featuredImageFluid && (!featuredScene) && (
                  <div  >
                    <Img fluid={featuredImageFluid} />
                    {/* {featuredImageCaption && <span className={postStyles.imageCaption}>{featuredImageCaption}</span>} */}
                  </div>
                )}
            </div>
          )} 
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Container>
        {/* <SubscribeForm /> */}
      </article>
      <Container noVerticalPadding>
        <Share
          url={`${config.siteUrl}/${mdx.frontmatter.slug}/`}
          title={title}
          twitterHandle={config.twitterHandle}
        /> 
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featuredScene
        featuredImageCaption
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        author
        banner {
          childImageSharp {
            fluid(maxWidth: 900) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
            fixed(width: 300, height: 300) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        slug
        keywords
      }
      body
    }
  }
`
