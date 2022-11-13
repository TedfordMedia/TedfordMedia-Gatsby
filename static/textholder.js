import * as React from "react"  
import styled from 'styled-components';  
  
// const MySetup = styled.div({
//     background: 'pink',
//     max-width: 100% !important;  max-width: 100% !important;
//     height: '500px',
//     width: '100%',  
// });

 
// width: 100vw;
// max-width: 100% !important;
// padding: 30px;
// display: flex;
// flex-direction: column;
// align-items: center;
// justify-content: center;
// text-align: center;
const StyledContainer = styled.section`
  max-width: 900px; 
  margin: 0 auto;
  padding-top: 1em;
`;

const Layout = props => { 
    return ( 
        <StyledContainer  >
          {props.children} 
        </StyledContainer>  
    )
}

export default Layout   