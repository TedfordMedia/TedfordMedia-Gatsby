import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky,Reflector, useTexture, TorusKnot, Box } from '@react-three/drei'
import { Water } from 'three-stdlib'
import { css } from '@emotion/core'

 








 import Layout from "../../components/layoutwidellh"  
// import { Canvas, useFrame} from "@react-three/fiber"
// import { Stars, Html, OrbitControls, useLoader, useTexture, Text } from '@react-three/drei';
// import * as THREE from 'three'





 
import {   Mesh, RepeatWrapping, Vector2 } from 'three'

 

const ReflectorScene = (props) => {
  const roughness = useTexture('roughness_floor.jpeg')
  const normal = useTexture('NORM.jpg')
  const distortionMap = useTexture('dist_map.jpeg')
  const $box = useRef()
  var normalScale = .5;
  const _normalScale = React.useMemo(() => new Vector2(normalScale || 0), [normalScale])

  React.useEffect(() => {
    distortionMap.wrapS = distortionMap.wrapT = RepeatWrapping
    distortionMap.repeat.set(4, 4)
  }, [distortionMap])

  useFrame(({ clock }) => {
    $box.current.position.y += Math.sin(clock.getElapsedTime()) / 25
    $box.current.rotation.y = clock.getElapsedTime() / 2
  })

  return (
    <section
      css={css`
        color: ${'white'};
        width: 100%;
        height: 100%; 
        background: ${'ref'};
        padding: 0px 0 0px 0;
        display: flex;
      `}
    > 
      <div
        css={css`
          height: 100%;  
          width: 100%;
          background: ${'blue'};
          overflow: hidden;
        `}
      >
        <Reflector
          resolution={1024}
          args={[10, 10]}
          mirror={0.75}
          mixBlur={8}
          mixStrength={1}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          minDepthThreshold={0.8}
          maxDepthThreshold={1.2}
          depthScale={1}
          depthToBlurRatioBias={0.2}
          debug={0}
          distortion={props.distortion || 0}
          distortionMap={distortionMap}
        >
          {(Material, props) => (
            <Material
              color="#ddd"
              metalness={0}
              roughnessMap={props.roughness}
              roughness={1}
              normalMap={normal}
              normalScale={_normalScale}
              {...props}
            />
          )}
        </Reflector>

        <Box args={[2, 3, 0.2]} position={[0, 1.6, -3]}>
          <meshPhysicalMaterial color="hotpink" />
        </Box>
        <TorusKnot args={[0.5, 0.2, 128, 32]} ref={$box} position={[0, 1, 0]}>
          <meshPhysicalMaterial color="hotpink" />
        </TorusKnot>
        <spotLight intensity={1} position={[10, 6, 10]} penumbra={1} angle={0.3} />
      </div>
    </section>
  )
}



 

export const ReflectorSt = () => (
  <React.Suspense fallback={null}>
    <ReflectorScene mixBlur={8} depthScale={1} distortion={0.005} normalScale={0.5} />
  </React.Suspense>
)






















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
    [waterNormals]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}

function ZBox() {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 20
    ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta
  })
  return (
    <mesh ref={ref} scale={20}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  )
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
            style={{ height: "100%", width: "100%" }}
            camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}>
            <pointLight position={[100, 100, 100]} />
            <pointLight position={[-100, -100, -100]} />
            <Suspense fallback={null}>
               <ReflectorScene/>
            </Suspense>
            <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
            <OrbitControls />
        </Canvas>
      </div>
  
  </Layout> 
)
  
export default MyPage  