import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/core";
import Layout from "@components/LayoutX";
import { useTheme } from "@components/Theming";
import LivingRoomDemo from "@components/basics/livingroomdemo";

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
        <LivingRoomDemo />
      </div>
    </section>
  );
};

export default function Index({ data: { site } }) {
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
  }
`;
