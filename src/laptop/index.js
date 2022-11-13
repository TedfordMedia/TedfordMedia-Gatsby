
import React, { Suspense, useState   } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stars,   Sky, Html } from '@react-three/drei' 
import { css } from '@emotion/core'
import Laptop from "../../helpers/Samsunglaptop.js"; 
import Layout from "../../components/layoutwidellh"  
import * as THREE from 'three'
const MyPage = (props) => (   
 <Layout  css={css`  
      `}>    
      <div  className={'mydiv'}       
        css={css` 
        height: 100%;
        overflow: hidden;
      `}>  
        <Canvas 
            onCreated={({ gl, camera, scene }) => {  
                gl.outputEncoding = THREE.sRGBEncoding
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = THREE.PCFSoftShadowMap; 
                const fogColor = new THREE.Color(0x000000);
                scene.fog = new THREE.Fog(fogColor, .0025, 80);
                // scene.background = new THREE.Color( 0xa0a0a0 ); 
            }}
            style={{ height: "100%", width: "100%" }}  
            camera={{ position: [0, 200, 400], fov: 40, near: 1, far: 100 }}> 
            <pointLight position={[5, 45, 10]} />
            <pointLight position={[55, 45, -50]} />
            <pointLight position={[5, 5, 4]} />
            <pointLight position={[5, -5, -4]} />
            <pointLight position={[-5, 5, -4]} />
            <pointLight position={[-8, 3, 4]} />
            <ambientLight intensity={.8} />
  
            <Suspense fallback={<Html><h1 style={{color:'white'}}>Loading...</h1></Html>}>  
              <group scale={[.08, .08, .08]}  rotation={[0, -Math.PI , 0]} position={[0, -1, -1]} > 
                <Laptop/> 
              </group>
            </Suspense>
            {/* <Stars/> */}
            <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
            <OrbitControls  maxDistance={20} maxPolarAngle={Math.PI / 2}  autoRotate autoRotateSpeed={-.8} />
        </Canvas>
      </div>
  
  </Layout> 
)
  
export default MyPage  