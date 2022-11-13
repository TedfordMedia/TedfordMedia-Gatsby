import React , {  useEffect } from 'react';
import { graphql } from 'gatsby'
import { Link } from "gatsby"
import { css } from '@emotion/core'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Layout from "../../components/Layout"  
import styled from '@emotion/styled'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../mystyling.scss'
import { useTheme } from '../../components/Theming'
import Image from 'gatsby-image' 
import Header from '../../components/Header'

const StyledLink = styled(props => <Link {...props} />)`
    color: black;
    text-decoration: none;
`;

export default function Index({ data: { site, allMdx } }) {
  const theme = useTheme()
 
  useEffect(() => {   
      document.body.style.cursor = "auto";
  }) 
  //

  return (
    <Layout noSubscribeForm site={site}>  
        {/* <Hero /> */}

        <Container> 
            <div className="portfolioheader">
                <h2   css={css`
                  width: 100%;
                  flex-shrink: 0;
                  background: none;
                  padding: 20px 0;
                  padding-bottom: 10px;
                  font-weight: bold;
                  font-size: 38px;
                  color: ${theme.colors.headerBg};
                `}>
                  Portfolio
                </h2>   
            </div>
            <Row>  
            {allMdx.edges.map(({ node: post }) => ( 
                <Col key={post.id} lg={6}> 
                    <Card className="mycardpart mb-2 mt-2"> 
                        <Card.Body className="mycardbody">
                            {post.frontmatter.banner && (
                                <Link
                                    aria-label={`View ${post.frontmatter.title} article`}
                                    to={`/${post.frontmatter.goto}`}
                                    >
                                    <Image   
                                        className="zthecard_image" 
                                        fluid={post.frontmatter.banner.childImageSharp.fluid}  
                                    />
                                </Link>
                            )}
                            <Card.Title className="mycardbottombit mytoppadding">
                                <StyledLink
                                    to={'../'+post.frontmatter.goto}
                                    aria-label={`View ${post.frontmatter.title}`}
                                >
                                  {post.frontmatter.title}
                                </StyledLink>
                            </Card.Title>
                            <Card.Text className="mycardbottombit  ">
                                {post.frontmatter.description}{' '}
                            </Card.Text>
                        </Card.Body> 
                    </Card>    
                </Col>   
            ))}
        </Row> 
        </Container>
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
      limit: 500
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { goto: { ne: null } } }
    ) {
      edges {
        node { 
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
                fluid(maxWidth: 2000, maxHeight: 1300, quality: 100) {
                    ...GatsbyImageSharpFluid
                }    
                fixed(width: 300, height: 300) {
                    ...GatsbyImageSharpFixed
                }
              }
            }
            slug
            goto
            keywords
          }
        }
      }
    }
  }
`
