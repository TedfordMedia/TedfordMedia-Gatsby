import React, { Suspense } from "react";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Shader1 from "@components/shaders/Shader1";
import Shader2 from "@components/shaders/Shader2";
import Shader3 from "@components/shaders/Shader3";

const ShaderThings = ({ props }) => (
  <>
    <Canvas
      onCreated={({ gl, camera, scene }) => {
        scene.background = new THREE.Color(0x000000);
      }}
      camera={{
        position: [0, 0, 10],
        fov: 30,
      }}
      style={{ height: "100%", width: "100%" }}
    >
      <Stars />

      <Suspense fallback={<Html>loading</Html>}>
        <Shader1 position={[-2, 1, 1]} />
        <Shader2 position={[3, 0, -1]} />
        <Shader3 position={[0, 0, -3]} />
      </Suspense>
      <OrbitControls autoRotateSpeed={.15} target={[0, 0, 0]} enableDamping dampingFactor={0.05} />
    </Canvas>
  </>
);

export default ShaderThings;
