import React, { useFrame, useRef, Suspense } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import EnvSingleCouple from "@helpers/Env_SwankyOffice5.js";

function Dolighting({ brightness, color }) {
  return (
    <group name="lighting">
      <hemisphereLight intensity={0.1} />
      <directionalLight
        position={[67, 19, 127]}
        intensity={0.4}
        castShadow
        shadow-camera-zoom={2}
      />
      <directionalLight
        position={[67, 30, 50]}
        intensity={0.2}
        castShadow
        shadow-camera-zoom={2}
      />
      <directionalLight
        position={[-57, 30, 40]}
        intensity={0.2}
        castShadow
        shadow-camera-zoom={2}
      />
    </group>
  );
}
// function Building() {
//   const gltf = useLoader(
//     GLTFLoader,
//     "@models/singlelivingroom/Environment_SingleCouple.gltf"
//   );
//   return (
//     <Suspense fallback={null}>
//       <primitive object={gltf.scene} />
//     </Suspense>
//   );
// }

const MainFloorDemo = ({ props }) => (
  <Canvas
    style={{ height: "100%", width: "100%" }}
    shadowMap
    shadows
    gl={{ alpha: false }}
    camera={{
      position: [-3, 1.1, 4.5],
      fov: 30,
      near: 0.01,
      far: 3000,
    }}
    onCreated={({ gl, camera, scene }) => {
      gl.outputEncoding = THREE.sRGBEncoding;
      gl.shadowMap.enabled = true;
      gl.shadowMap.type = THREE.PCFSoftShadowMap;
    }}
  >
    <Dolighting />
    <mesh position={[0, 0, 0]}>
      <boxBufferGeometry args={[1, 1, 1]} attach="geometry" />
      <meshPhongMaterial attach="material" />
    </mesh>
    <Suspense fallback={<Html></Html>}>
      {/* <EnvSingleCouple /> */}
    </Suspense>
    <OrbitControls target={[0, 0, 0]} />
  </Canvas>
);

export default MainFloorDemo;
