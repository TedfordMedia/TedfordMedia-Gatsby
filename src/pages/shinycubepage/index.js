import React from 'react' 
import Layout from "../../components/layoutwide" 
import TheThing from "../../components/shinycubedemo"; 

const IndexPage = (props) => (   
  <Layout displayHero={false}>   
    <section >
      <div  style={{ height: "100vh", width: "100%",background:"yellow" }}>  
        <TheThing forcedHeight={'80vh'}/>
      </div>
    </section> 
  </Layout> 
)
 
export default IndexPage  