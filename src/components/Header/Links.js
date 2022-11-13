import React from 'react'
import { Link } from 'gatsby'
import { useTheme } from '../Theming'
import ThemeToggler from './ThemeToggler'

export default () => {
  const theme = useTheme()
  return (
    <React.Fragment>
      <Link to="/portfolio_page" activeClassName="active" aria-label="View Portfolio page">
        Portfolio
      </Link>
      {/* <Link to="/blog" activeClassName="active" aria-label="View blog page">
        Blog
      </Link> */}
      {/* <Link to="#" activeClassName="active" aria-label="View blog page">
        About
      </Link> */}
      {/* <Link to="#" activeClassName="active" aria-label="View blog page">
        Contact
      </Link> */}

      <ThemeToggler
        css={{}}
        toggleTheme={theme.toggleTheme}
        themeName={theme.themeName}
      />
    </React.Fragment>
  )
}
