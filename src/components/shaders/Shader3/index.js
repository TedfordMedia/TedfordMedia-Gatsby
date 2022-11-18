import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import fragmentShader from "./frag";
import {vertexShader, uniform2} from "./details"; 

let clock;
clock = new THREE.Clock();

const Sphere = (props) => {
  const mesh = useRef();

  useFrame(() => {
    uniform2.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh {...props} ref={mesh}>
      <icosahedronBufferGeometry attach="geometry" args={[1, 128]} />
      <shaderMaterial
        uniforms={uniform2}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={"true"}
      />
    </mesh>
  );
};

export default function Shader3(props) { 

  return (
   <>
      <Sphere {...props} />
    </>
  );
}
