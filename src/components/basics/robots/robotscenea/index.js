import React, { Suspense } from 'react' 
import Robot from "../../../../helpers/Robot6dance.js";
import { Html,   Stars   } from '@react-three/drei'; 
import { Canvas } from "@react-three/fiber"  
import * as THREE from 'three'


const RobotStarsScene = ({ author, noSubscribeForm }) => (
    <Canvas style={{ height: "500px", width: "100%" }} 
    shadowMap
    shadows
    gl={{ alpha: false }}
    camera={{ position: [-3, 1.1, 4], fov: 30 }}
    onCreated={({ gl, camera, scene }) => { 
      // gl.toneMapping = THREE.ACESFilmicToneMapping
      // gl.outputEncoding = THREE.sRGBEncoding
      gl.shadowMap.enabled = true;
      gl.shadowMap.type = THREE.PCFSoftShadowMap;
    }}>
        <group position={[0,-1,0]} >
            <hemisphereLight intensity={.04} />
            <directionalLight position={[67, 19, 127]}  intensity={.2} castShadow shadow-camera-zoom={2} /> 
            <directionalLight position={[67,30,50]}  intensity={0.3} castShadow shadow-camera-zoom={2} />
            <directionalLight position={[-57, 30,40]}  intensity={0.3} castShadow shadow-camera-zoom={2} />

            <mesh castShadow receiveShadow position={[0, -.5, 0]} >
                <boxBufferGeometry args={[1, 1, 1]}  attach="geometry" />
                <meshPhongMaterial color={'red'} attach="material" />
            </mesh> 

            <Stars/>
            <Suspense fallback={<Html></Html>}>    
                <Robot castShadow/> 
            </Suspense> 

            {/* <OrbitControls target={[0,.8,0]}/>    */}
        </group> 
    </Canvas>
)

export default RobotStarsScene 