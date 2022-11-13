import React from "react";
import { Link } from "gatsby";
import { useTheme } from "../Theming";
import ThemeToggler from "./ThemeToggler";

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
