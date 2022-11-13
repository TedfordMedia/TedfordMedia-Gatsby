
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/corridoor.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group scale={[1.03, 1.03, 1.03]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            {/* //doors */}
            <group position={[-7.47, 1.02, -0.05]}>
              <mesh geometry={nodes.Mesh_0.geometry} material={nodes.Mesh_0.material} />
              <mesh geometry={nodes.Mesh_1.geometry} material={nodes.Mesh_1.material} />
            </group>
            <group position={[-7.47, 1.02, 2.85]} rotation={[0, 0, -Math.PI]} scale={[-1, -1, -1]}>
              <mesh geometry={nodes.Mesh_6.geometry} material={nodes.Mesh_6.material} />
              <mesh geometry={nodes.Mesh_7.geometry} material={nodes.Mesh_7.material} />
            </group>
  
            <group position={[0.38, 1, 1.02]}>
              <mesh geometry={nodes.Mesh_2.geometry} material={materials.light} />
              <mesh geometry={nodes.Mesh_3.geometry} material={materials.material} />
              <mesh geometry={nodes.Mesh_4.geometry} material={materials.bottom} />
              <mesh geometry={nodes.Mesh_5.geometry} material={materials.mirror} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/corridoor.glb')
