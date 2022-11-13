
import React, { Suspense, useState   } from 'react'
import { Canvas } from '@react-three/fiber' 
import { css } from '@emotion/core' 
import Layout from "../../components/layoutwidellh"  
import * as THREE from 'three'
import '../mystyling.scss' 

const MyPage = (props) => (   
 <Layout >    
      <div  
        className={'mydiv'}       
        css={css` 
            height: 100%;
            overflow: hidden;
        `}>  

      </div>
  
  </Layout> 
)
  
export default MyPage  