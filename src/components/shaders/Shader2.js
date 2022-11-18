import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import fragmentShader from "./frag";
import vertexShader from "./vert";

export default function Shader2(props) {
  var startTime = Date.now();

  const uniforms = {
    time: { value: 0.0 },
  };

  useFrame(() => {
    var currentTime = Date.now();
    uniforms.time.value = performance.now() / 1000;
  });

  function ConeShape(props) {
    const boxRef = useRef();
    useFrame(() => {
      boxRef.current.rotation.y = boxRef.current.rotation.x -= 0.002;
    });
    return (
      <mesh ref={boxRef} position={[1.5, 0.51, -10]} scale={2}>
        <boxGeometry />
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
      <ConeShape />
    </>
  );
}
