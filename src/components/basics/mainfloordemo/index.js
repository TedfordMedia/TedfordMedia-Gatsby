import React, { useMemo, Suspense } from "react";
import { OrbitControls, Html, Plane } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// import Floor15 from "@components/floorpart/Floor15";
import Floor from "@components/basics/flooring/Floor";
import SimpleLighting from "@components/basics/lighting/SimpleLighting";

const MainFloorDemo = ({ props }) => (
  <Canvas
    style={{ height: "100%", width: "100%" }}
    shadowMap
    shadows
    gl={{ alpha: false }}
    camera={{
      position: [-3, 10, 30.5],
      fov: 30,
      near: 0.01,
      far: 3000,
    }}
    onCreated={({ gl, camera, scene }) => {
      gl.outputEncoding = THREE.sRGBEncoding;
      gl.shadowMap.enabled = true;
      gl.shadowMap.type = THREE.PCFSoftShadowMap;

      const fogColor = new THREE.Color(0xffffff);
      scene.background = fogColor;
      scene.fog = new THREE.Fog(fogColor, 0.0025, 80);
      gl.setPixelRatio(window.devicePixelRatio);
    }}
  >
    <SimpleLighting />
    <Floor />

    <Suspense fallback={<Html></Html>}>
      {/* <Floor15 /> */}
    </Suspense>
    <OrbitControls target={[0, 0, 0]} />
  </Canvas>
);

export default MainFloorDemo;
