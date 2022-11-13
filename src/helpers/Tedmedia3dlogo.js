 
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'


//useShaderOne
  //      {props.displayHero && <Hero title={props.heroTitle} description={props.heroDescription} />}

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/tedmedia3dlogo.glb')
 

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh castShadow receiveShadow
        geometry={nodes.Curve027.geometry}
        material={materials['SVGMat.028']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve026.geometry}
        material={materials['SVGMat.027']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve025.geometry}
        material={materials['SVGMat.026']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve024.geometry}
        material={materials['SVGMat.025']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve023.geometry}
        material={materials['SVGMat.024']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve022.geometry}
        material={materials['SVGMat.023']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve021.geometry}
        material={materials['SVGMat.022']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve020.geometry}
        material={materials['SVGMat.021']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve019.geometry}
        material={materials['SVGMat.020']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve018.geometry}
        material={materials['SVGMat.019']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve017.geometry}
        material={materials['SVGMat.018']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve016.geometry}
        material={materials['SVGMat.017']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve015.geometry}
        material={materials['SVGMat.016']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve014.geometry}
        material={materials['SVGMat.015']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve013.geometry}
        material={materials['SVGMat.014']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve012.geometry}
        material={materials['SVGMat.013']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve011.geometry}
        material={materials['SVGMat.012']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve010.geometry}
        material={materials['SVGMat.011']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve009.geometry}
        material={materials['SVGMat.010']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve008.geometry}
        material={materials['SVGMat.009']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve007.geometry}
        material={materials['SVGMat.008']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve006.geometry}
        material={materials['SVGMat.007']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve005.geometry}
        material={materials['SVGMat.006']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve004.geometry}
        material={materials['SVGMat.005']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve003.geometry}
        material={materials['SVGMat.004']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve001.geometry}
        material={materials['SVGMat.002']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve.geometry}
        material={materials['SVGMat.001']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
      <mesh castShadow receiveShadow
        geometry={nodes.Curve002.geometry}
        material={materials['SVGMat.003']}
        position={[-0.11, 0, -0.07]}
        scale={[1.42, 1.42, 1.42]}
      />
    </group>
  )
}

useGLTF.preload('/tedmedia3dlogo.glb')
