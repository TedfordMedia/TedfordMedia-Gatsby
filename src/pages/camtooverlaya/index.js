import * as THREE from 'three'
import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture, Html, softShadows, Shadow, MeshWobbleMaterial } from '@react-three/drei'
import { Water } from 'three-stdlib'
import { css } from '@emotion/core'

import Sub from "../../helpers/Submarine.js"; 
import LogoTedfordMedia from "../../helpers/Tedmedia3dlogo.js";  
import Layout from "../../components/layoutwidellh"  
// import { Canvas, useFrame} from "@react-three/fiber"
// import { Stars, Html, OrbitControls, useLoader, useTexture, Text } from '@react-three/drei';
// import * as THREE from 'three'
import Sofa from "../../helpers/Tedmed_sofa.js"; 
softShadows();

 
function Button() {
  const vec = new THREE.Vector3()
  const light = useRef()
  const [active, setActive] = useState(false)
  const [zoom, set] = useState(false)
  useEffect(() => void (document.body.style.cursor = active ? 'pointer' : 'auto'), [active])

  useFrame((state) => {
    const step = 0.04
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step)
    state.camera.position.lerp(vec.set(zoom ? 25 : 10, zoom ? 1 : 5, zoom ? 0 : 10), step)
    state.camera.lookAt(0, 2, 0)
    state.camera.updateProjectionMatrix()
    light.current.position.lerp(vec.set(zoom ? 4 : 0, zoom ? 3 : 8, zoom ? 3 : 5), step)
  })

  return (
    <mesh receiveShadow castShadow onClick={() => set(!zoom)} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)}>
      <sphereBufferGeometry args={[0.75, 64, 64]} />
      <meshPhysicalMaterial color={active ? '#e7b056' : '#683386'} clearcoat={1} clearcoatRoughness={0} />
      <Shadow position-y={-0.79} rotation-x={-Math.PI / 2} opacity={0.6} scale={[0.8, 0.8, 1]} />
      <directionalLight ref={light} castShadow intensity={1.5} shadow-camera-far={70} />
    </mesh>
  )
}

function ButtonB() {
  const vec = new THREE.Vector3()
  const light = useRef()
  const [active, setActive] = useState(false)
  const [zoom, set] = useState(false)
  useEffect(() => void (document.body.style.cursor = active ? 'pointer' : 'auto'), [active])

  useFrame((state) => {
    const step = 0.04
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step)
    state.camera.position.lerp(vec.set(zoom ? 95 : 0, zoom ? 1 : 5, zoom ? 0 : 10), step)
    state.camera.lookAt(0, 1, 0)
    state.camera.updateProjectionMatrix()
    light.current.position.lerp(vec.set(zoom ? 4 : 0, zoom ? 3 : 8, zoom ? 3 : 5), step)
  })

  return (
    <mesh position={[1,0,9]} receiveShadow castShadow onClick={() => set(!zoom)} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)}>
      <sphereBufferGeometry args={[0.75, 64, 64]} />
      <meshPhysicalMaterial /> 
      <Shadow position-y={-0.79} rotation-x={-Math.PI / 2} opacity={0.6} scale={[0.8, 0.8, 1]} />
      <directionalLight ref={light} castShadow intensity={0.1} shadow-camera-far={70} />
        <group position={[0.9, -0.2, 0]}  >      
            <Html occlude>
              <div className="label labeldiv">Test Label!</div>
            </Html>
        </group>
    </mesh>
  )
}

function Box() {
  const myytexture = useTexture('./images/tedmedlogos/square_logo.png')   
 
  const ref = useRef()
  useFrame((state, delta) => {
    // ref.current.position.y =   Math.sin(state.clock.elapsedTime) * 4
    ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta
  })
  return (
    <mesh position={[.6,3.55,2.4]} castShadow receiveShadow ref={ref} scale={2}>
      <boxGeometry />
      <meshStandardMaterial  color={"white"} map={myytexture} />
    </mesh>
  )
}
 
function Plane({ color, ...props }) {
  return (
    <mesh receiveShadow castShadow {...props}>
      <boxBufferGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const MyPage = (props) => (   
  <Layout>    
    <div  
      className={'mydiv'}       
      css={css` 
      height: 100%;
      overflow: hidden;
    `}>  
      <Canvas 
          shadows 
          camera={{ position: [10, 5, 10], fov: 42 }}
          onCreated={({ gl, camera, scene }) => {  
          scene.background = new THREE.Color( 0xa2b9e7 ); 
      }}>
 
        <ambientLight intensity={.4} />
        <pointLight position={[-10, -10, 5]} intensity={2} color="#ff20f0" />
        <pointLight position={[0, 0.5, -1]} distance={1} intensity={2} color="#e4be00" />
        <group position={[0, -0.9, -3]}>

          <Suspense fallback={<Html></Html>}>    
            <Box/>
          </Suspense> 

          <Suspense fallback={<Html></Html>}> 
            <group rotation-x={Math.PI / 2} rotation-z={-Math.PI/2}  position-y={2}  position-x={-1.4} position-z={3.5} scale={[10,10,10]}> 
              <LogoTedfordMedia/>
            </group>   
 
            <group rotation-x={Math.PI / 2}   position-y={1.8}  position-x={0} position-z={.2} scale={[15,15,15]}> 
              <LogoTedfordMedia/>
            </group>   
          </Suspense>  
 
          <Suspense fallback={<Html></Html>}>  
            <group  scale={[15,15,15]} rotation-y={Math.PI / 2} position={[2,0,5]} > 
              {/* <Sofa/> */}
            </group>   
          </Suspense>  



          <group position={[0, 1, -1]}>   
            <ButtonB />  
          </group>

          <Plane color="lightblue" rotation-x={-Math.PI / 2} position-z={2} scale={[4, 20, 0.2]} />
          <Plane color="#aaa000" rotation-x={-Math.PI / 2} position-y={1} scale={[4.2, 0.2, 4]} />
          <Plane color="#44hhaa" rotation-x={-Math.PI / 2} position={[-1.7, 1, 3.5]} scale={[0.5, 4, 4]} /> 
        </group>
        <Button />       
        <OrbitControls target={[0,0,0]}/>   
      </Canvas>
    </div>
  </Layout> 
)
  
export default MyPage  