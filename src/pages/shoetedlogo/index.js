import * as THREE from 'three'
import React, { Suspense, useRef, useMemo , useState,useEffect} from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky, useTexture, Html, Environment } from '@react-three/drei' 
import { css } from '@emotion/core'
 import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
 import Layout from "../../components/layoutwidellh"   
import Robot from "../../helpers/Robot6dance.js";
 var i = 0;
function Box() {  
  const myytexture = useTexture('./images/tedmedlogos/square_logo_BW.png')  
  const myytexturecol = useTexture('./images/tedmedlogos/square_logo.png')  

  const ref = useRef() 
  return (
    <mesh position={[0,0,0]} ref={ref} scale={5}>
      <boxGeometry />
      <meshStandardMaterial  metalness={1} color={"blue"}  roughnessMap={myytexture} roughness={1} />
    </mesh>
  )
}

// This component was auto-generated from GLTF by: https://github.com/react-spring/gltfjsx
function Bird({ speed, factor, url, ...props }) {
  const { nodes, materials, animations } = useLoader(GLTFLoader, url)
  const group = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())

  useEffect(() => void mixer.clipAction(animations[0], group.current).play(), [])

  useFrame((state, delta) => {
    group.current.rotation.y += Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 1) * 1.5
    mixer.update(delta * speed)
  })

  return (
    <group ref={group} dispose={null}>
      <scene name="Scene" {...props}>
        <mesh
          name="Object_0"
          morphTargetDictionary={nodes.Object_0.morphTargetDictionary}
          morphTargetInfluences={nodes.Object_0.morphTargetInfluences}
          rotation={[1.5707964611537577, 0, 0]}
          geometry={nodes.Object_0.geometry}
          material={materials.Material_0_COLOR_0}
        />
      </scene>
    </group>
  )
}
function Dolighting({ brightness, color }) {
  return (
    <group name="lighting">
      <hemisphereLight intensity={1.3} />
      <ambientLight intensity={1.5} />
      {/* <directionalLight position={[7, 19, 2]}  intensity={.7}   /> 
      <directionalLight position={[40,40,30]}  intensity={2.8}   />
      <directionalLight position={[-5, 3,30]}  intensity={0.9}   />      <directionalLight position={[67, 19, 20]}  intensity={.7}   /> 
      <directionalLight position={[40,40,30]}  intensity={2.8}   />
      <directionalLight position={[-57, 30,40]}  intensity={0.9}   />   */}

      <spotLight intensity={1} position={[10, 6, -30]} penumbra={1} angle={0.3} />
      <spotLight intensity={1} position={[-10, 6, 30]} penumbra={1} angle={0.3} />
      <spotLight intensity={1} position={[10, 1, 30]} penumbra={1} angle={0.3} />
    </group>
  );
}
 
const MyPage = (props) => (   
 <Layout  css={css`  
      `}>    
      <div  className={'mydiv'}       
        css={css` 
        height: 400px;
        overflow: hidden;
      `}>  
        <Canvas 
            style={{ height: "100%", width: "100%" }}  lookAt={[0, -10, 2]} 
            camera={{ position: [0, 2, 20], fov: 75, near: 1, far: 400 }}>
      

            <Dolighting/>
            <Suspense fallback={null}>    
              <Environment preset="dawn"    />          
            </Suspense>
            <Suspense fallback={<Html><h1 style={{color:'blue'}}>Loading...</h1></Html>}>  
                <Box /> 
            </Suspense> 
            <OrbitControls  maxDistance={50} maxPolarAngle={Math.PI / 2} autoRotate autoRotateSpeed={-.8}/>
        </Canvas>
      </div>
  
  </Layout> 
)
  
export default MyPage  