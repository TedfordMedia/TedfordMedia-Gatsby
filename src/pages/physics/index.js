import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky, Box, Plane, Html, useTexture } from '@react-three/drei'
import { Water } from 'three-stdlib'
import { css } from '@emotion/core'

import { Physics, useBox, usePlane } from "@react-three/cannon";

 
 import Layout from "../../components/layoutwidellh"  

const TheNormalCubeB = (props) => {
  const groupRef = useRef();
  const myytexture = useTexture('./images/tedmedlogos/square_logo.png')   
 
//   useFrame(() => {
//     groupRef.current.rotation.x += 0.01;
//     groupRef.current.rotation.y += 0.01;
//   });

  return (
    <group ref={groupRef}>
      <mesh {...props}>
        <boxBufferGeometry castShadow receiveShadow args={[4, 4, 4]} />
        <meshStandardMaterial castShadow receiveShadow  color={"white"} map={myytexture}  />
        <Html>
          <div className="label">Cubetest</div>
        </Html>
      </mesh>
    </group>
  );
};
function PhyPlane({ color, ...props }) {
  const [ref] = usePlane(() => ({ ...props }));

  return (
    <Plane args={[1000, 1000]} ref={ref}>
      <meshStandardMaterial color={color} />
    </Plane>
  );
}

function PhyBox(props) {
  const [ref, api] = useBox(() => ({ args: [1, 1, 1], mass: 1, ...props }));
  const myytexture = useTexture('./images/tedmedlogos/square_logo.png')   
 
  return (
    <Box
      args={[1, 1, 1]}
      ref={ref}
      onClick={() => api.applyImpulse([0, 0, -10], [0, 0, 0])}
    >
      <meshStandardMaterial color={"white"} map={myytexture}  />
    </Box>
  );
}




extend({ Water })

function Ocean() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, './images/waternormals.jpg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding
    }),
    [waterNormals,gl]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}
 
const MyPage = (props) => {
  
 
  return(
    <Layout  css={css`  
      `}>    
      <div  className={'mydiv'}       
        css={css` 
        background-color: 'green'
        height: 100%;
        overflow: hidden;
      `}>  
        <Canvas  
            shadowMap
            shadows
            gl={{ alpha: false }}
            camera={{ 
            position: [1, 3, 40], 
            fov: 30 ,  
            near: 0.01,
            far: 1100
            }}
            onCreated={({ gl, camera, scene }) => {  
                gl.outputEncoding = THREE.sRGBEncoding
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = THREE.PCFSoftShadowMap;  
                scene.background = new THREE.Color( 0xa0a0a0 ); 
            }}
            style={{ height: "100%", width: "100%" }}
        ><Ocean/>
 {/* <Suspense fallback={null}> 
        <mesh castShadow receiveShadow position={[0, -.5, 2]}>
            <boxBufferGeometry args={[3,3,3]} />
            <meshStandardMaterial   color="#7222D3"     roughness={1}   /> 
        </mesh> </Suspense> */}
             <Physics gravity={[0, -10, 0]}>
              <PhyPlane castShadow receiveShadow 
                color="hotpink"
                position={[0, -2, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              />

              <PhyPlane castShadow receiveShadow color="lightblue" position={[0, 0, -10]} />
             <PhyBox castShadow receiveShadow position={[2, 0, 5]} />
              <PhyBox castShadow receiveShadow position={[0, 0, 0]} />
              <PhyBox castShadow receiveShadow position={[-2.5, 0, -5]} /> 
            </Physics>

            <pointLight castShadow 
                shadow-mapSize-height={512}
                shadow-mapSize-width={512}
                position={[5,0,5]} intensity={.8}/>
 
              <pointLight castShadow 
                shadow-mapSize-height={512}
                shadow-mapSize-width={512}
                position={[5,10,15]} intensity={.8}/>
 
            <ambientLight intensity={0.2} />
            <OrbitControls  maxDistance={650} maxPolarAngle={Math.PI / 2} autoRotate autoRotateSpeed={-.8}/>
       
        </Canvas>
      </div>
  
  </Layout> 
)}
  
export default MyPage  