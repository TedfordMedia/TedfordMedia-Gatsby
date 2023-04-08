import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from "three";

export default function Bird(props) {
  const birdRef = useRef()
  const { nodes, materials, animations } = useGLTF('/phoenix_bird.glb')
  const { actions } = useAnimations(animations, birdRef)

  useEffect(() => {
    actions['Take 001'].play()
  });

  useFrame(({ clock }) => {
    const time = (clock.elapsedTime * props.speed) % 1.0; // multiply time by speed
    const position = props.curve.getPointAt(time);
    const tangent = props.curve.getTangentAt(time).normalize();
    birdRef.current.position.copy(position);
    birdRef.current.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      tangent
    );
  });
  return (
    <group ref={birdRef} {...props} dispose={null} >
      <group name="Sketchfab_Scene" position={[0, 20, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <group name="Sketchfab_model" position={[-0.62, 0, -17.14]} rotation={[-Math.PI / 2, 0, 0.05]}>
          <group name="5f59736c86d4457fa045aec4aea6b7e0fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <group name="Object_6" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="AMesh_Ride_FengHuang_01" rotation={[-Math.PI / 2, 0, 0]} />
                  <skinnedMesh castShadow name="Object_7" geometry={nodes.Object_7.geometry} material={materials.MatI_Ride_FengHuang_01a} skeleton={nodes.Object_7.skeleton} />
                  <skinnedMesh castShadow name="Object_8" geometry={nodes.Object_8.geometry} material={materials.MatI_Ride_FengHuang_01b} skeleton={nodes.Object_8.skeleton} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/phoenix_bird.glb')

