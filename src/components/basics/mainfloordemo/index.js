import React, { useMemo, Suspense } from "react";
import { OrbitControls, Html, Plane } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GenTools from "/src/GenTools";

function Dolighting({ brightness, color }) {
  return (
    <group name="lighting">
      <hemisphereLight intensity={0.1} />
      <directionalLight
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        shadow-radius={3}
        shadow-bias={-0.0001}
        //  shadow-camera-far={50}
        //       shadow-camera-left = {-10}
        //       shadow-camera-right = {10}
        //       shadow-camera-top = {10}
        //       shadow-camera-bottom = {-10}
        position={[67, 19, 127]}
        intensity={1}
        castShadow
        shadow-camera-zoom={2}
      />
    </group>
  );
}
function Building() {
  const { scene } = useLoader(GLTFLoader, "/models/fl15.glb");

  useMemo(
    () =>
      scene.traverse((obj) => {
        GenTools.basicTraverse(obj);
      }),
    [scene]
  );

  return (
    <Suspense fallback={null}>
      <primitive scale={[0.1, 0.1, 0.1]} object={scene} />
    </Suspense>
  );
}

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
    <Dolighting />
    {/* Floor */}
    <Plane
      receiveShadow
      args={[100, 100]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.2, 0]}
    >
      <meshPhongMaterial attach="material" color={"#ededed"} />
    </Plane>
    <Suspense fallback={<Html></Html>}>
      <Building />
    </Suspense>
    <OrbitControls target={[0, 0, 0]} />
  </Canvas>
);

export default MainFloorDemo;
