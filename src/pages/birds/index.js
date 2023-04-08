import * as THREE from 'three'
import React, { Suspense, useRef, useMemo , useState,useEffect} from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky, useTexture, Html } from '@react-three/drei' 
import { css } from '@emotion/core'
 import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
 import Layout from "@components/layoutwidellh"   
import Robot from "@helpers/Robot6dance.js";
 var i = 0;
function Box() {
  const myytexture = useTexture('./images/square_logo.png')   
 
  const ref = useRef() 
  return (
    <mesh position={[0,0,0]} ref={ref} scale={20}>
      <boxGeometry />
      <meshStandardMaterial  color={"white"} map={myytexture} />
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
function Birds() {
  return new Array(20).fill().map((_, i) => {
    const x = (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1)
    const y = -10 + Math.random() * 20
    const z = -5 + Math.random() * 10
    const bird = ['Stork', 'Parrot', 'Flamingo'][Math.round(Math.random() * 2)]
    let speed = bird === 'Stork' ? 0.5 : bird === 'Flamingo' ? 2 : 5
    let factor = bird === 'Stork' ? 0.5 + Math.random() : bird === 'Flamingo' ? 0.25 + Math.random() : 1 + Math.random() - 0.5
    return <Bird key={i} position={[x, y, z]} rotation={[0, x > 0 ? Math.PI : 0, 0]} speed={speed} factor={factor} url={`/${bird}.glb`} />
  })
}
const MyPage = (props) => (   
 <Layout  css={css`  
      `}>    
      <div  className={'mydiv'}       
        css={css` 
        height: 100%;
        overflow: hidden;
      `}>  
        <Canvas 
            style={{ height: "100%", width: "100%" }}  lookAt={[0, -10, 2]} 
            camera={{ position: [0, 2, 50], fov: 75, near: 1, far: 400 }}>
            <pointLight position={[100, 100, 100]} intensity={0.1}/>
            <pointLight position={[-100, -100, -100]} />
            <ambientLight intensity={.5} />

            <Suspense fallback={<Html><h1 style={{color:'blue'}}>Loading...</h1></Html>}>  
                <Birds/>
                <Box /> 
            </Suspense>
            <Suspense fallback={null}>    
                <Robot position={[0, 10, -0]} scale={[10,10,10]} castShadow/>  
            </Suspense>   
            <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
            <OrbitControls  maxDistance={50} maxPolarAngle={Math.PI / 2} autoRotate autoRotateSpeed={-.8}/>
        </Canvas>
      </div>
  
  </Layout> 
)
  
export default MyPage  