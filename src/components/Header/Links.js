import React from "react";
import { useTheme } from "../Theming";
import { css } from '@emotion/core'
import { navigate } from "gatsby"

export default () => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <button
        variant="primary"
        css={css`
          border-color: #ffffff;
          color: white;
          border-radius: 5px;
        `}
        onClick={() => {
          navigate("/portfolio_page");
        }}
      >
        Index
      </button>
    </React.Fragment>
  );
};
