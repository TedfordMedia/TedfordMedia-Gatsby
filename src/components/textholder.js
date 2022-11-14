import * as React from "react";
import styled from "styled-components";

const StyledContainer = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding-top: 1em;
`;

const Layout = (props) => {
  return <StyledContainer>{props.children}</StyledContainer>;
};

export default Layout;
