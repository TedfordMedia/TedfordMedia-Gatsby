import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/core";
import Layout from "@components/LayoutX";
import { useTheme } from "@components/Theming";
import MainFloorDemo from "@components/basics/mainfloordemo";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {  useLoader, useFrame } from '@react-three/fiber'



const BasicContainer = () => {
  const theme = useTheme();
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
        <MainFloorDemo />
      </div>
    </section>
  );
};

export default function Index({ data: { site, allMdx } }) {
  const theme = useTheme();
  return (
    <Layout noSubscribeForm noFooter site={site}>
      <BasicContainer />
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
`;
