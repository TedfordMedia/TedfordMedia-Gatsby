import React from 'react' 
import Layout from "../../components/layoutwide" 
import WatchScene from "../../components/basics/retrowatch" 
 
const IndexPage = (props) => (   
  <Layout displayHero={false}>   
    <section >
      <div  style={{ height: "500px", width: "100%",background:"yellow" }}>  
          <WatchScene/>  
      </div>
    </section> 
  </Layout> 
)
 
export default IndexPage  