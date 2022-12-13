import * as THREE from "three";
import React, { Suspense, useRef, useMemo } from "react";
import {
  Canvas,
  extend,
  useThree,
  useLoader,
  useFrame,
} from "@react-three/fiber";
import { OrbitControls, Sky, useTexture, Html } from "@react-three/drei";
import { Water } from "three-stdlib";
import { css } from "@emotion/core";

import Sub from "@helpers/Submarine.js";
import Layout from "@components/layoutwidellh";

extend({ Water });

function Ocean() {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "./images/waternormals.jpg"
  );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );
  useFrame(
    (state, delta) => (ref.current.material.uniforms.time.value += delta)
  );
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
}

function Box() {
  const myytexture = useTexture("./images/tedmedlogos/square_logo.png");

  const ref = useRef();
  return (
    <mesh position={[63, 20, 0]} ref={ref} scale={30}>
      <boxGeometry />
      <meshStandardMaterial color={"white"} map={myytexture} />
    </mesh>
  );
}

const MyPage = (props) => (
  <Layout css={css``}>
    <div
      className={"mydiv"}
      css={css`
        height: 100%;
        overflow: hidden;
      `}
    >
      <Canvas
        style={{ height: "100%", width: "100%" }}
        lookAt={[0, -10, 2]}
        camera={{ position: [0, 35, 150], fov: 55, near: 1, far: 20000 }}
      >
        <pointLight position={[100, 100, 100]} />
        <pointLight position={[-100, -100, -100]} />
        <ambientLight intensity={0.5} />

        <Suspense
          fallback={
            <Html>
              <h1 style={{ color: "blue" }}>Loading...</h1>
            </Html>
          }
        >
          <Ocean />
          <Box />
        </Suspense>

        <Suspense
          fallback={
            <Html>
              <h1 style={{ color: "white" }}>Loading...</h1>
            </Html>
          }
        >
          <group scale={[8, 8, 8]}>
            <Sub />
          </group>
        </Suspense>

        <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
        <OrbitControls
          maxDistance={650}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={-0.8}
        />
      </Canvas>
    </div>
  </Layout>
);

export default MyPage;
