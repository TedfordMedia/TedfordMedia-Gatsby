import React from 'react' 
import Layout from "../../components/layoutwide" 
import LogoMediaa from "../../components/basics/logoandcanvas"; 

const IndexPage = (props) => (   
  <Layout displayHero={false}>   
    <section >
      <div  style={{ height: "500px", width: "100%",background:"yellow" }}>  
        <LogoMediaa/>
      </div>
    </section> 
  </Layout> 
)
 
export default IndexPage  