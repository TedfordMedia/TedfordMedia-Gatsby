import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { css } from "@emotion/core";
import Sushi from "@helpers/Sushi";
import Layout from "@components/layoutwidellh";
import * as THREE from "three";

const MyPage = (props) => (
  <Layout>
    <Canvas
      shadows
      camera={{
        position: [0, 3, 10.01],
        fov: 75,
        near: 0.01,
        far: 100,
      }}
      onCreated={({ gl, camera, scene }) => {
        scene.background = new THREE.Color(0x000000);
      }}
    >
      <Suspense fallback={<Html></Html>}>
        <Sushi />
        <group position={[-1.3, -1.8, 0]}>
          {/*  */}
        </group>
      </Suspense>

      <OrbitControls
      // target={[0, 0, 0]}
      // enableZoom={false}
      // enablePan={true}
      // enableDamping
      // dampingFactor={0.2}
      // autoRotate={false}
      // rotateSpeed={-0.5}
      />
    </Canvas>
  </Layout>
);

export default MyPage;
