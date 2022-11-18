import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { vertexShader, fragmentShader, uniforms } from "./details";
import * as THREE from "three";

export default function Shader1(props) {
  let clock;
  clock = new THREE.Clock();

  useFrame(() => {
    var currentTime = Date.now();
    uniforms.iGlobalTime.value = clock.getElapsedTime() * 1.001;
  });

  function ConeShape(props) {
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y = mesh.current.rotation.x += 0.003;
    });
    return (
      <mesh ref={mesh} {...props} scale={(0.5, 0.5, 0.8)}>
        <coneGeometry
          attach="geometry"
          args={[1, 2.5, 3]}
          smoothness={5}
          {...props}
        />
        <shaderMaterial
          attach="material"
          args={[
            {
              uniforms: uniforms,
              vertexShader: vertexShader,
              fragmentShader: fragmentShader,
            },
          ]}
        />
      </mesh>
    );
  }

  return (
    <>
      <ConeShape {...props} />
    </>
  );
}
