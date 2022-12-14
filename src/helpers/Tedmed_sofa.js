import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/tedmed_sofa.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.indoor_sectional_sofa_1256_wood.geometry}
        material={materials.indoor_sectional_sofa_1256_wood_MatSG_Mat}
      />
      <mesh
        geometry={nodes.indoor_sectional_sofa_1256_leather.geometry}
        material={materials.indoor_sectional_sofa_1256_leather_MatSG_Mat}
      /> 
    </group>
  )
}

useGLTF.preload('/tedmed_sofa.glb')
