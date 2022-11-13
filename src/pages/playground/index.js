import * as THREE from 'three'
import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture, Html, softShadows, Shadow } from '@react-three/drei'
import { Water } from 'three-stdlib'
import { css } from '@emotion/core'

import Sub from "../../helpers/Submarine.js"; 
 
 import Layout from "../../components/layoutwidellh"  
// import { Canvas, useFrame} from "@react-three/fiber"
// import { Stars, Html, OrbitControls, useLoader, useTexture, Text } from '@react-three/drei';
// import * as THREE from 'three'

softShadows();


extend({ Water })

 
function Button() {
  const vec = new THREE.Vector3()
  const light = useRef()
  const [active, setActive] = useState(false)
  const [zoom, set] = useState(true)
  useEffect(() => void (document.body.style.cursor = active ? 'pointer' : 'auto'), [active])

  useFrame((state) => {
    const step = 0.1
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step)
    state.camera.position.lerp(vec.set(zoom ? 25 : 10, zoom ? 1 : 5, zoom ? 0 : 10), step)
    state.camera.lookAt(0, 2, 0)
    state.camera.updateProjectionMatrix()
    light.current.position.lerp(vec.set(zoom ? 4 : 0, zoom ? 3 : 8, zoom ? 3 : 5), step)
  })

  return (
    <mesh receiveShadow castShadow onClick={() => set(!zoom)} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)}>
      <sphereBufferGeometry args={[0.75, 64, 64]} />
      <meshPhysicalMaterial color={active ? 'purple' : '#e7b056'} clearcoat={1} clearcoatRoughness={0} />
      <Shadow position-y={-0.79} rotation-x={-Math.PI / 2} opacity={0.6} scale={[0.8, 0.8, 1]} />
      <directionalLight ref={light} castShadow intensity={1.5} shadow-camera-far={70} />
    </mesh>
  )
}

function Box() {
  const myytexture = useTexture('./images/tedmedlogos/square_logo.png')   
 
  const ref = useRef()
  // useFrame((state, delta) => {
  //   ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 20
  //   ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta
  // })
  return (
    <mesh position={[63,20,0]} ref={ref} scale={30}>
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
      <Canvas shadows camera={{ position: [10, 5, 10], fov: 42 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[-10, -10, 5]} intensity={2} color="#ff20f0" />
        <pointLight position={[0, 0.5, -1]} distance={1} intensity={2} color="#e4be00" />
        <group position={[0, -0.9, -3]}>

          <Suspense fallback={<Html></Html>}>    
            <Box/>
          </Suspense> 

          <Plane color="hotpink" rotation-x={-Math.PI / 2} position-z={2} scale={[4, 20, 0.2]} />
          <Plane color="#e4be00" rotation-x={-Math.PI / 2} position-y={1} scale={[4.2, 0.2, 4]} />
          <Plane color="#736fbd" rotation-x={-Math.PI / 2} position={[-1.7, 1, 3.5]} scale={[0.5, 4, 4]} />
          <Plane color="white" rotation-x={-Math.PI / 2} position={[0, 4.5, 3]} scale={[2, 0.03, 4]} />
        </group>
        <Button />
      </Canvas>
    </div>
  </Layout> 
)
  
export default MyPage  