import React, { Suspense } from "react";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import { Canvas, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";
import LogoShader1 from "@components/shaders/LogoShader1";
import Shader2 from "@components/shaders/Shader2";

const ShaderThings = ({ props }) => (
  <>
    <Canvas
      onCreated={({ gl, camera, scene }) => {
        scene.background = new THREE.Color(0x000000);
      }}
      camera={{
        position: [0, 0, 4],
        fov: 30,
      }}
      style={{ height: "100%", width: "100%" }}
    >
      <Stars />

      <Suspense fallback={<Html>loading</Html>}>
        <LogoShader1 />
        <Shader2 />
      </Suspense>
      <OrbitControls target={[0, 0, 0]} enableDamping dampingFactor={0.05} />
    </Canvas>
  </>
);

export default ShaderThings;
