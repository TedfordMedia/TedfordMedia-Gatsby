import React, { Suspense } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import { Canvas, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";
// import Floor15 from "@components/floorpart/Floor15";
import Floor from "@components/basics/flooring/Floor";
import SimpleLighting from "@components/basics/lighting/SimpleLighting";
import SettingsIcon from "@components/ui/SettingsIcon";
import LogoShader1 from "@components/shaders/LogoShader1";

const ShaderThings = ({ props }) => (
  <>
    <Canvas
      style={{ height: "100%", width: "100%" }}
      shadowMap
      shadows
      gl={{ alpha: false }}
      camera={{
        position: [-.2, 1.3, 3.7],
        fov: 30,
        near: 0.1,
        far: 100,
      }}
      onCreated={({ gl, camera, scene }) => {
        gl.outputEncoding = THREE.sRGBEncoding;
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
        gl.shadowMap.autoUpdate = true;
        gl.toneMapping = THREE.ACESFilmicToneMapping;

        const fogColor = new THREE.Color(0xffffff);
        scene.background = fogColor;
        scene.fog = new THREE.Fog(fogColor, 0.0025, 80);
        gl.setPixelRatio(window.devicePixelRatio);
      }}
    >
      {/* <SimpleLighting /> */}
      {/* <Floor /> */}

      <Suspense fallback={<Html>loading</Html>}>
        <LogoShader1 />
      </Suspense>
      <OrbitControls
        target={[0, 0, 0]}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  </>
);

export default ShaderThings;
