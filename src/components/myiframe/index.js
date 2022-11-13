import React , {useRef, Suspense} from 'react';
import Layout from "../../components/layoutwide"  
import { Canvas, useThree } from "@react-three/fiber"
import { Html, OrbitControls, useCubeTexture, useTexture } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three'
import Model from "../../helpers/Sentry.js"; 

 
function TheCurveThing({children}){
 
  const [ref] = useRef() 
  const { gl, scene } = useThree() 
  const myytexture = useTexture('./images/squareAroughbw.png') 
  const envMap = useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], { path: './images/gym/' })
 
  scene.background = envMap;
  scene.environment = envMap; 

  

  return (
    <> 
      <group position={[0, 0, 2]}> 
        <mesh position={[-1, 0, 0]}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial metalness={1} roughnessMap={myytexture} roughness={.3} envMap={envMap} /> 
        </mesh> 
      </group> 
    </>
  )
}

function MyPage(props){
    
    console.log(props.forcedHeight);

    return (
      <>  
        <Layout displayHero={false}>    
            <div  style={{ height: props.forcedHeight, width: "100%",background:"black" }}>  
                <Canvas  
                camera={{
                    position: [0, 0, .01],
                    fov: 75,
                    near: 0.01,
                    far: 100
                }}
                //pixelRatio={Math.min(window.devicePixelRatio, 2)}
                 
                style={{ height: "100%", width: "100%" }}>
        
                    <pointLight position={[-10, 20, 20]} intensity={.8}/>
                    <pointLight position={[10, 10, -10]} intensity={.8}/>
                
                    <Suspense fallback={null}>  
                        <TheCurveThing> 
                        </TheCurveThing> 
                    </Suspense>

                    <Suspense fallback={<Html>Loading...</Html>}>    
                    <group scale={[.03,.03,.03]} position={[.7, -1, -1.5]}>
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