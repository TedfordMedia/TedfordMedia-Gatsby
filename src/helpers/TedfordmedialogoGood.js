 
import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sphere
} from "@react-three/drei";

export default function Model(props) {
  const group = useRef()

  const { nodes, materials } = useGLTF('/tedfordmedialogo.gltf')
 
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]}>
        <mesh
          geometry={nodes.Curve027.geometry}
          //  material={nodes.Curve027.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        >    
        <meshStandardMaterial
                        attach="material" // How the element should attach itself to its parent
                        color={nodes.Curve027.material.color} // The color of the material
                        transparent // Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects. When set to true, the extent to which the material is transparent is controlled by setting it's .opacity property.
                        roughness={0.1} // The roughness of the material - Defaults to 1
                        metalness={0.1} // The metalness of the material - Defaults to 0
                        />
        </mesh>
        <mesh
          geometry={nodes.Curve026.geometry}
          material={materials['SVGMat.027']}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve025.geometry}
          material={nodes.Curve025.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve024.geometry}
          material={nodes.Curve024.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve023.geometry}
          material={nodes.Curve023.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve022.geometry}
          material={nodes.Curve022.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve021.geometry}
          material={nodes.Curve021.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve020.geometry}
          material={nodes.Curve020.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve019.geometry}
          material={nodes.Curve019.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve018.geometry}
          material={nodes.Curve018.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve017.geometry}
          material={nodes.Curve017.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve016.geometry}
          material={nodes.Curve016.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve015.geometry}
          material={nodes.Curve015.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve014.geometry}
          material={nodes.Curve014.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve013.geometry}
          material={nodes.Curve013.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve012.geometry}
          material={nodes.Curve012.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve011.geometry}
          material={nodes.Curve011.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve010.geometry}
          material={nodes.Curve010.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve009.geometry}
          material={nodes.Curve009.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve008.geometry}
          material={nodes.Curve008.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve007.geometry}
          material={nodes.Curve007.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve006.geometry}
          material={nodes.Curve006.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve005.geometry}
          material={nodes.Curve005.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve004.geometry}
          material={nodes.Curve004.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve003.geometry}
          material={nodes.Curve003.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve001.geometry}
          material={nodes.Curve001.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve.geometry}
          material={nodes.Curve.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
        <mesh
          geometry={nodes.Curve002.geometry}
          material={nodes.Curve002.material}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.42, 1.42, 1.42]}
        />
      </group>
      <PerspectiveCamera
        makeDefault={false}
        far={2}
        near={0}
        fov={34.52}
        position={[0.5, 0.3, 0.5]}
        rotation={[-0.36, 0.75, 0.25]}
      />
    </group>
  )
}

useGLTF.preload('/tedfordmedialogo.gltf')
