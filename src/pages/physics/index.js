import React, { Suspense } from 'react';
import Layout from "../../components/layoutwide"
import { Canvas } from "@react-three/fiber"
import { Stars, OrbitControls } from '@react-three/drei';
import { Physics } from "@react-three/cannon";
import Ball from "./ball";

import * as THREE from 'three'
import Stairs from "@components/Stairs";

const MyPage = (props) => (
    <Layout displayHero={false}>
        <div style={{ height: "100vh", width: "100%", background: "#a0a0a0" }}>
            <Canvas
                shadowMap
                shadows
                onCreated={({ gl, camera, scene }) => {
                    scene.background = new THREE.Color(0x000000);
                    gl.outputEncoding = THREE.sRGBEncoding
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = THREE.PCFSoftShadowMap;
                }}
                camera={{
                    position: [0, 0, 4], fov: 30
                }}
                style={{ height: "100%", width: "100%" }}>

                <pointLight position={[-10, 20, 20]} intensity={1} />
                <Stars />

                <Suspense fallback={null}>
                    <Stairs />
                </Suspense>
                <Physics>
                    <Ball position={[0.5, 7, 0]} color={"red"} />
                    <Ball position={[0, 5, 0]} color={"green"} />
                    <Ball position={[-0.5, 9, 0]} color={"blue"} />
                    <Ground rotation={[-Math.PI / 2, 0, 0]} />
                </Physics>
                <OrbitControls />
            </Canvas>
        </div>
    </Layout>
)

export default MyPage