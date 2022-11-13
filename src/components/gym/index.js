import React , {  useEffect, Suspense, useRef} from 'react';
import Layout from "../../components/layoutwide"   
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Html, OrbitControls, useCubeTexture, useTexture } from '@react-three/drei'; 
import Model from "../../helpers/Sentry.js"; 
import gsap from "gsap"; 
import * as THREE from 'three'


function TheShinyCube(){ 
  const ref = useRef()  

  const myytexture = useTexture('./images/tedmedlogos/square_logo_BW.png')  
 

  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.002))

  return (
    <> 
      <group position={[0, 0, 2]} ref={ref}> 
        <mesh position={[-1, 0, 0]}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial metalness={1} color={'#589bcd'} roughnessMap={myytexture} roughness={1}  /> 
        </mesh> 
      </group> 
    </>
  )
}
function Box({position, color}) {
  const ref = useRef() 
  var endpos = new THREE.Vector3(10,.5,3);
 
  useEffect(() => {  
    console.log('useEff')

    gsap.to( ref.current.position, {
      duration: 30,  
      x: endpos.x,
      y: endpos.y,
      z: endpos.z, 
    });  
  }) 

  useFrame(() => (ref.current.rotation.x = ref.current.rotation.x += 0.01))

  return (
    <mesh position={position} ref={ref}>
      <boxBufferGeometry args={[1, 1, 1]} attach="geometry" />
      <meshPhongMaterial color={color} attach="material" />
    </mesh>
  )
}

function MyPage(props){
     
    return (
      <>  
        <Layout displayHero={false}>    
            <div  style={{ height: props.forcedHeight, width: "100%",background:"black" }}>  
                <Canvas  
                  camera={{
                      position: [0, 0, -.01],
                      fov: 75,
                      near: 0.01,
                      far: 100
                  }}
                
                style={{ height: "100%", width:  "100%" }}>
        
                    <pointLight position={[-10, 20, 20]} intensity={.8}/>
                    <pointLight position={[10, 10, -10]} intensity={.8}/>
                
                    <Suspense fallback={<Html><h1 style={{color:'white'}}>Loading...</h1></Html>}>  
                        <TheShinyCube/>   
                    </Suspense> 

                    <Box color="#f56f42" position={[1, 0, 3]} />   
                    <Suspense fallback={<Html><h1 style={{color:'white'}}>Loading...</h1></Html>}>    
                    <group scale={[.03,.03,.03]} rotation={[0,180,0]} position={[1, -1, 5]}>
                        <Model  />  
                    </group>
                    </Suspense> 
        
                <OrbitControls  enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5}/>
                </Canvas>
            </div> 
        </Layout> 
      </>
    )
}
 
export default MyPage  