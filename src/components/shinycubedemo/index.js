import React, { Suspense } from 'react' 
  
import { OrbitControls, Environment  } from '@react-three/drei'
import { Canvas } from "@react-three/fiber"  
import * as THREE from 'three'
import MyFloor from "@components/basics/flooring/bluecubeish"; 
import LogoTedfordMedia from "@helpers/Tedmedialogotedb.js";  

function Dolighting({ brightness, color }) {
  return (
    <group name="lighting">
      <hemisphereLight intensity={.1} />
      <directionalLight position={[67, 19, 127]}  intensity={.4} castShadow shadow-camera-zoom={2} /> 
      <directionalLight position={[67,30,50]}  intensity={0.2} castShadow shadow-camera-zoom={2} />
      <directionalLight position={[-57, 30,40]}  intensity={0.2} castShadow shadow-camera-zoom={2} />  
    </group>
  );
}
 
function TheCurveThing(){
   
  return (
    <> 
      <group position={[0, 0, 2]}> 
        <mesh position={[-1, 0, 0]}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial metalness={1}     roughness={0}  /> 
        </mesh> 
      </group> 
    </>
  )
}

const RobotStarsSceneNew = ({ props }) => (
    <Canvas 
        style={{ height: "100%", width: "100%" }} 
        shadowMap
        shadows
        gl={{ alpha: false }}
        camera={{ 
          position: [0, 1.1, 8.5], 
          fov: 30 ,  
          near: 0.01,
          far: 3000
        }}
        
        onCreated={({ gl, camera, scene }) => {  
            gl.outputEncoding = THREE.sRGBEncoding
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap; 
      }}> 
        <Suspense>
          <TheCurveThing/>
        </Suspense>
 
        <group position={[0, -.6, 0]} >
           
          <MyFloor/>
          <Suspense fallback={null}> 
            <Environment preset="dawn"   background /> 
          </Suspense>

          <Dolighting/>

          <Suspense fallback={null}>   
              <LogoTedfordMedia position={[-.57, -.045, .51]} scale={[140, 140, 140]} castShadow/>  
          </Suspense> 

          <OrbitControls/> 
        </group> 
    </Canvas>
)

export default RobotStarsSceneNew