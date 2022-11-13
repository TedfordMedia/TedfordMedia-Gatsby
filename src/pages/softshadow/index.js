import React , {useRef, Suspense} from 'react';
import Layout from "../../components/layoutwide"  
import { Canvas, useFrame} from "@react-three/fiber"
import { Html, OrbitControls,useTexture } from '@react-three/drei';
import * as THREE from 'three' 
import Samba from "../../helpers/Samba";  
import { Plane, Sphere } from '@react-three/drei'; 
import LogoTedfordMedia from "../../helpers/Tedmedialogosilver"; 
 

function TheFollowCube(){ 
  const ref = useRef()   
  const myytexture = useTexture('./images/tedmedlogos/square_logo.png')   
   
  return (
    <> 
      <group position={[6, 0, 0]} ref={ref}>  
  
        <mesh castShadow receiveShadow position={[-4, 0, 0]}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial    map={myytexture}   roughness={1}   /> 
        </mesh> 
      </group> 
    </>
  )
}
 
function SoftShadowsScene() {
  const sphere = useRef()

  useFrame(({ clock }) => {
    sphere.current.position.y = Math.sin(clock.getElapsedTime()) + 1.8
    sphere.current.position.x = 2
  })

  return (
    <> 
    <fog attach="fog" args={['white', 0, 40]} />
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[7.5, 6, 9]}
        intensity={.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} /> */}

      <group position={[-3,-.5, 0]}>
        <Sphere ref={sphere}  castShadow receiveShadow args={[.4, 24, 24]}>
          <meshStandardMaterial color="royalblue" attach="material" />
        </Sphere>
      </group>

      <Plane receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.5, 0]} args={[10, 10, 4, 4]}>
        <shadowMaterial attach="material" opacity={0.5} />
      </Plane>
      <Plane rotation-x={-Math.PI / 2} position={[0, -0.5, 0]} args={[10, 10, 4, 4]}>
        <meshBasicMaterial attach="material" opacity={0.5} />
      </Plane>

        <Suspense fallback={<Html><h1 style={{color:'#99e600'}}>Loading...</h1></Html>}>   
            <TheFollowCube/>    
        </Suspense> 
        {/* <Light/> */}
        <Suspense fallback={null}>   
            <LogoTedfordMedia position={[-5,10,-5]} scale={[2000, 2000, 2000]} rotation={[2, 0, 0]} castShadow/>  
        </Suspense>  

        <Suspense fallback={<Html><h1 style={{color:'#99e600'}}>Loading...</h1></Html>}>   
          <group position={[0,-.5, 0]}>
              <Samba/>
          </group> 
        </Suspense> 

        <OrbitControls  maxDistance={20} maxPolarAngle={Math.PI / 2}    /> 
    </>

  )
}


const MyPage = (props) => {

    return (   

  <Layout displayHero={false}>      
    <div  style={{ height: "100vh", width: "100%",background:"#a0a0a0" }}>       
     <Canvas  
            shadowMap
            shadows
            gl={{ alpha: false }}
            camera={{ 
            position: [0,1,6], 
            fov: 30 ,  
            near: 0.01,
            far: 250
            }}
            onCreated={({ gl, camera, scene }) => {  
                gl.outputEncoding = THREE.sRGBEncoding
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = THREE.PCFSoftShadowMap; 
                // gl.toneMapping = THREE.ACESFilmicToneMapping
                // const fogColor = new THREE.Color(0x00ff00);
                // scene.fog = new THREE.Fog(fogColor, 9.0025, 80);
                //  scene.background = new THREE.Color( 0x000000 ); 
            }}


            style={{ height: "100%", width: "100%" }}
        >
            <SoftShadowsScene />
  
        </Canvas>
    </div>
  </Layout> 
)
 } 
export default MyPage  