/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

 
export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/samba.glb')

  const { actions } = useAnimations(animations, group)
 
  useEffect(() => { 
    // actions.idle.play();
    actions['Armature|mixamo.com|Layer0'].play()
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh castShadow
          geometry={nodes.Alpha_Joints.geometry}
          material={materials.Alpha_Joints_MAT}
          skeleton={nodes.Alpha_Joints.skeleton}
        />
        <skinnedMesh castShadow
          geometry={nodes.Alpha_Surface.geometry}
          material={materials.Alpha_Body_MAT}
          skeleton={nodes.Alpha_Surface.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/samba.glb')
