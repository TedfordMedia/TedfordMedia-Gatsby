import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'




export default function SurgeonModel(props) { 
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/surgeon.glb')
  const { actions } = useAnimations(animations, group) 
  //console.dir(actions)
  
  useEffect(() => { 
    actions.happyidle.play();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.Ch16_Body1.geometry}
          material={nodes.Ch16_Body1.material}
          skeleton={nodes.Ch16_Body1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ch16_Cap.geometry}
          material={nodes.Ch16_Cap.material}
          skeleton={nodes.Ch16_Cap.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ch16_Eyelashes.geometry}
          material={materials.Ch16_eyelashes}
          skeleton={nodes.Ch16_Eyelashes.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ch16_Mask.geometry}
          material={nodes.Ch16_Mask.material}
          skeleton={nodes.Ch16_Mask.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ch16_Pants.geometry}
          material={nodes.Ch16_Pants.material}
          skeleton={nodes.Ch16_Pants.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ch16_Shirt.geometry}
          material={nodes.Ch16_Shirt.material}
          skeleton={nodes.Ch16_Shirt.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ch16_Shoes.geometry}
          material={nodes.Ch16_Shoes.material}
          skeleton={nodes.Ch16_Shoes.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/surgeon.glb')
