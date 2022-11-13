import * as React from "react"  
import Hero from "./hero"
import "./styles/layout.css" 
 

const Layout = props => { 
  return (
      <div className={'mydiv'}> 
        {props.displayHero && <Hero title={props.heroTitle} description={props.heroDescription} />}
        <div  className={'mydiv'}> 
          {props.children} 
        </div> 
 
      </div>
  )
}

export default   Layout   