 
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { Html } from '@react-three/drei';
import '../styles.css'

export default function Model(props) {
  const group = useRef()
  const occluderRef =  useRef()
  const { nodes, materials, animations } = useGLTF('/samsunglaptop.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group name="lid" position={[0, 2.38, 22.98]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
              <mesh ref={occluderRef} geometry={nodes.lid_alum_0.geometry} material={nodes.lid_alum_0.material} />
              <mesh geometry={nodes.lid_gun_0.geometry} material={nodes.lid_gun_0.material} />
              <mesh geometry={nodes.lid_samsung_0.geometry} material={materials.samsung} />
              <mesh geometry={nodes.lid_scr_0.geometry} material={materials.material_2} />
              <group position={[-.5, -.3, .5]}  >      
                  <Html className="html-story-label" occlude>
                    <div className="label labeldiv">Second test label</div>
                  </Html>
              </group>
            </group>
            <group position={[0, 1.72, -25.79]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
              <mesh geometry={nodes.body_alum_0.geometry} material={nodes.body_alum_0.material} />
              <group position={[0.9, -0.2, 0]}  >      
                  <Html occlude>
                    <div className="label labeldiv">Test Label!</div>
                  </Html>
              </group>

              <mesh geometry={nodes.body_buton_0.geometry} material={materials.buton} />
              <mesh geometry={nodes.body_flack_0.geometry} material={materials.flack} />
              <mesh geometry={nodes.body_gun_0.geometry} material={nodes.body_gun_0.material} />
              <mesh geometry={nodes.body_keys_0.geometry} material={materials.keys} />
              <mesh geometry={nodes.body_tp_0.geometry} material={materials.material_5} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/samsunglaptop.glb')
