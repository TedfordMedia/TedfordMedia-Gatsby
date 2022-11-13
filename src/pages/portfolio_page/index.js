import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import { Container, Row, Col, Card } from "react-bootstrap";
import Layout from "@components/Layout";
import styled from "@emotion/styled";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "@components/Theming";
import Image from "gatsby-image";

import "../mystyling.scss";
const StyledLink = styled((props) => <Link {...props} />)`
  color: black;
  text-decoration: none;
`;

export default function Index({ data: { site, allMdx } }) {
  const theme = useTheme();

  useEffect(() => {
    document.body.style.cursor = "auto";
  });
  //

  return (
    <Layout noSubscribeForm site={site}>
      <Container>
        <div className="portfolioheader" />
        <Row>
          {allMdx.edges.map(({ node: post }) => (
            <Col key={post.id} lg={6}>
              <Card
                className="mb-2 mt-2 mycardpart"
                css={css`
                  border-radius: 15px;
                  padding: 0px;
                  background-color: #edf2f6;
                `}
              >
                <Card.Body
                  className="mycardbody"
                  css={css`
                    border-radius: 15px;
                    padding: 0px;
                  `}
                >
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
                      to={"../" + post.frontmatter.goto}
                      aria-label={`View ${post.frontmatter.title}`}
                    >
                      {post.frontmatter.title}
                    </StyledLink>
                  </Card.Title>
                  <Card.Text className="mycardbottombit  ">
                    {post.frontmatter.description}{" "}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
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
`;
