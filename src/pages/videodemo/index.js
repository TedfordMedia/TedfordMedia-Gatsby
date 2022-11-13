
import React, { Suspense, useState   } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stars, Html } from '@react-three/drei' 
import { css } from '@emotion/core' 
import Layout from "../../components/layoutwidellh"  
import * as THREE from 'three'

import url from "/static/arintro.mp4";
 
const TV = () => {
  const { nodes } = useGLTF("tv.gltf");

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = url;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  return (
    <group position={[0, 1, 0]} rotation={[Math.PI / 8, Math.PI * 1.2, 0]}>
      <mesh castShadow geometry={nodes.TV.geometry}>
        <meshStandardMaterial color="grey" />
      </mesh>
      <mesh rotation={[0, Math.PI , 0]} position={[0, 0, 1.1]}>
        <planeGeometry args={[3.2, 1.9]} />
        <meshStandardMaterial   emissive={"white"} side={THREE.DoubleSide}>
          <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
};



const Floor = () => {
  return (
    <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[-2, -2, 0]}>
      <planeBufferGeometry args={[100, 100, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

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
            // camera={{ position: [0, 200, 400], fov: 40, near: 1, far: 100 }}
          > 
        
            <ambientLight intensity={.1} />

            <pointLight castShadow position={[100, 100, 100]} intensity={.2} />
            {/* <pointLight castShadow position={[-100, -100, -100]} /> */}

            <Suspense fallback={<Html><h1 style={{color:'white'}}>Loading...</h1></Html>}>  
              <group scale={[1,1,1]}  rotation={[0, 0 , 0]} position={[0, -1, 0]} >  
                  <TV />
                  <Floor /> 
              </group>
            </Suspense>
            {/* <Stars/> */}
            <Stars/>
            <OrbitControls  maxDistance={20} maxPolarAngle={Math.PI / 2}  autoRotate autoRotateSpeed={-.2} />
        </Canvas>
      </div>
  
  </Layout> 
)
  
export default MyPage  