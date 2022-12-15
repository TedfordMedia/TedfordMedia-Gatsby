import React, { Suspense } from 'react';
import Layout from "../../components/layoutwide"
import { Canvas } from "@react-three/fiber"
import { Stars, OrbitControls } from '@react-three/drei';
import { Physics } from "@react-three/cannon";
import Ball from "./ball";
import Ground from "./ground";

import * as THREE from 'three'
import Stairs from "@components/Stairs";

const MyPage = (props) => (
    <Layout displayHero={false}>
        <div style={{ height: "100vh", width: "100%", background: "#a0a0a0" }}>
            <Canvas
                colorManagement
                shadowMap
                onCreated={({ gl, camera, scene }) => {
                    scene.background = new THREE.Color(0x000000);
                    // gl.outputEncoding = THREE.sRGBEncoding
                    // gl.shadowMap.enabled = true;
                    // gl.shadowMap.type = THREE.PCFSoftShadowMap;
                }}
                camera={{
                    position: [0, 5, 8], fov: 50, far: 50, near: .3
                }}
                style={{ height: "100%", width: "100%" }}>
                {/* <directionalLight
                    intensity={0.9}
                    castShadow position={[-10, 20, 20]}
                    shadow-mapSize-height={128}
                    shadow-mapSize-width={128}
                /> */}
    <directionalLight
      intensity={.7}
      position={[20, 20, 20]}
    //   shadow-bias={-0.00005}
    //   angle={Math.PI / 6}
      shadow-mapSize-width={512}
      shadow-mapSize-height={512}
      castShadow
    />
                {/* <pointLight castShadow position={[-10, 20, 20]} intensity={.8} shadow-mapSize-height={512}
                    shadow-mapSize-width={512} /> */}
                <ambientLight intensity={.6} />
                <Stars />

                <Suspense fallback={null}>
                    <Stairs />
                </Suspense>
                <Physics>
                    <group scale={[.08, .08, .08]}  >
                        <Ball position={[0.5, 50, 0]} color={"white"} />
                        <Ball position={[0, 60, 0]} color={"green"} />
                        <Ball position={[-0.5, 90, 0]} color={"blue"} />
                    </group>
                    <Ground rotation={[-Math.PI / 2, 0, 0]} />
                </Physics>
                <OrbitControls />
            </Canvas>
        </div>
    </Layout>
)

export default MyPage