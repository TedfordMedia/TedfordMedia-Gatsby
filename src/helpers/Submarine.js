import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/submarine.glb");

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            name="Lens_2"
            position={[-1.93, -0.05, -0.01]}
            rotation={[0, 0, 0]}
            scale={[0.2, 0.2, 0.2]}
          >
            <mesh
              geometry={nodes.Object_22.geometry}
              material={materials["Material.018"]}
            />
            <mesh
              geometry={nodes.Object_23.geometry}
              material={materials["Material.017"]}
            />
            <mesh
              geometry={nodes.Object_24.geometry}
              material={materials["Material.002"]}
            />
            <mesh
              geometry={nodes.Object_25.geometry}
              material={materials["Material.013"]}
            />
            <mesh
              geometry={nodes.Object_26.geometry}
              material={materials["Material.012"]}
            />
            <mesh
              geometry={nodes.Object_27.geometry}
              material={materials["Material.014"]}
            />
            <mesh
              geometry={nodes.Object_28.geometry}
              material={materials["Material.015"]}
            />
          </group>
          <group
            position={[4.38, 0.2, 0.04]}
            rotation={[0, 0, 0]}
            scale={[-0.2, -1.59, -0.2]}
          >
            <mesh
              geometry={nodes.Object_10.geometry}
              material={nodes.Object_10.material}
            />
            <mesh
              geometry={nodes.Object_11.geometry}
              material={nodes.Object_11.material}
            />
            <mesh
              geometry={nodes.Object_12.geometry}
              material={nodes.Object_12.material}
            />
            <mesh
              geometry={nodes.Object_4.geometry}
              material={nodes.Object_4.material}
            />
            <mesh
              geometry={nodes.Object_5.geometry}
              material={nodes.Object_5.material}
            />
            <mesh
              geometry={nodes.Object_6.geometry}
              material={nodes.Object_6.material}
            />
            <mesh
              geometry={nodes.Object_7.geometry}
              material={nodes.Object_7.material}
            />
            <mesh
              geometry={nodes.Object_8.geometry}
              material={nodes.Object_8.material}
            />
            <mesh
              geometry={nodes.Object_9.geometry}
              material={nodes.Object_9.material}
            />
          </group>
          <group
            position={[1.27, -0.05, -0.01]}
            rotation={[-2.48, -0.01, -1.59]}
            scale={[2.41, 1.28, 2.41]}
          >
            <mesh
              geometry={nodes.Object_14.geometry}
              material={materials["Material.006"]}
            />
            <mesh
              geometry={nodes.Object_15.geometry}
              material={materials["Material.016"]}
            />
            <mesh
              geometry={nodes.Object_16.geometry}
              material={materials["Material.001"]}
            />
            <mesh
              geometry={nodes.Object_17.geometry}
              material={materials["Material.008"]}
            />
            <mesh
              geometry={nodes.Object_18.geometry}
              material={materials["Material.010"]}
            />
            <mesh
              geometry={nodes.Object_19.geometry}
              material={materials["Material.005"]}
            />
            <mesh
              geometry={nodes.Object_20.geometry}
              material={materials["Material.003"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/submarine.glb");
