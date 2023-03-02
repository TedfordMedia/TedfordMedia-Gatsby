import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls, Html, Box } from "@react-three/drei"
import Webcam from "react-webcam"; 
import { proxy, useSnapshot } from "valtio"
import '../../styles.css'
import '../mystyling.scss'  
import Layout from "../../components/layoutwide"   
import * as THREE from 'three'  
 
const state = proxy({
  current: null,
  items: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  },
})
  
const MyPage = (props) => { 
  const webcamRef = useRef(null);

return (   
  <Layout displayHero={false}>    
      <div  style={{ height: "100vh", width: "100%",background:"#a0a0a0" }}>  
        <Canvas  
            dpr={[1, 2]}   
            shadows
            gl={{ alpha: false }}
            camera={{  
              position: [0, 0, 3],
              fov: 50 ,   
            }}
            onCreated={({ gl, camera, scene }) => {  
                // gl.outputEncoding = THREE.sRGBEncoding
                // gl.shadowMap.enabled = true;
                // gl.shadowMap.type = THREE.PCFSoftShadowMap;  
                // scene.background = new THREE.Color( 0xFFFFFF ); 
            }}
            style={{ height: "100%", width: "100%" }}
        >
          
          <Suspense fallback={null}>
            <Box />
            <Environment preset="city" /> 
          </Suspense>
            <OrbitControls  maxDistance={20} maxPolarAngle={Math.PI / 2}  autoRotate autoRotateSpeed={-.2} />
        </Canvas>

        <div
          style={{
            position: "absolute",
            right: 10,
            top: 10
          }}
        >
          <Webcam
            width="200"
            height="113"
            mirrored
            id="webcam"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
        </div>
      </div> 
  </Layout> 
)
}
  
export default MyPage  




















// import * as handpose from "@tensorflow-models/handpose";
// import Webcam from "react-webcam"; 
// import React, { Suspense,  useEffect, useCallback, useState } from 'react'
// import { Canvas, useTexture, useFrame } from '@react-three/fiber' 
// import Layout from "../../components/layoutwidellh"    
// import LogoTedfordMedia from "../../helpers/Tedmedia3dlogo.js";  
// const scale = point => -(point - 70) / 50;

 
 
 
// function MyPage(props){
 
//   const webcamRef = React.useRef(null);
//   const modelRef = React.useRef(null);
//   const requestRef = React.useRef(null);
//   const predictionsRef = React.useRef(null);
//   const [ready, setReady] = React.useState(false); 
  
//   const capture = useCallback(async () => {
//     if (webcamRef.current && modelRef.current) {
//         const predictions = await modelRef.current.estimateHands(
//             webcamRef.current.getCanvas(),
//             true
//         );

//         if (predictions) {
//             predictionsRef.current = predictions;
//         }

//         if (!ready) {
//             setReady(true);
//         }
//     }

//     requestRef.current = requestAnimationFrame(capture);
//   }, [webcamRef, ready]);

//   useEffect(() => {
//       const load = async () => {
//         modelRef.current = await handpose.load();
//       };

//       load();
//   }, [capture]);
 
//   return (
//     <Layout>    
//         <Canvas shadowMap sRGB camera={{ position: [0, 0, 5] }}>
//           <ambientLight intensity={0.4} />
//           <spotLight
//               position={[3, 0, 11]}
//               angle={0.6}
//               penumbra={1}
//               intensity={0.2}
//               shadow-mapSize-width={2048}
//               shadow-mapSize-height={2048}
//               shadow-bias={-0.0001}
//           />
//           <mesh position={[0, 0, -10]} receiveShadow castShadow>
//           <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
//           <meshPhongMaterial attach="material" color="#00010a" />
//           </mesh>

//           <Suspense fallback={null}>   
//               <LogoTedfordMedia rotation-x={Math.PI / 2} position={[0,0,0]} scale={[12, 12, 12]} castShadow/>  
//           </Suspense> 

//           {ready && <Hand predictionsRef={predictionsRef} />}
//         </Canvas>

//         <div
//           style={{
//             position: "absolute",
//             right: 10,
//             top: 10
//           }}
//         >
//           <Webcam
//             width="200"
//             height="113"
//             mirrored
//             id="webcam"
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//           />
//         </div>

//       {!ready && (
//           <div
//           style={{
//               backgroundColor: "rgba(23,32,23,0.3)",
//               position: "absolute",
//               color: "white",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               right: 0,
//               top: 0,
//               left: 0,
//               bottom: 0
//           }}
//           >
//           <button
//               onClick={(e,) => {  
//                   requestRef.current = requestAnimationFrame(capture);
//               }}
//           >
//               Click me and wait...
//           </button>
//           </div>
//       )}

//     </Layout> 
// )}
  
// export default MyPage  