import React, { useEffect, useRef, Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GenTools from "/src/GenTools";
import { useLoader, useFrame } from "@react-three/fiber";
import useSceneStore from "/src/useSceneStore";

function Floor15() {
  const { scene } = useLoader(GLTFLoader, "/models/31wV2.glb");
  const exMetal = useSceneStore((state) => state.exMetal);
  const ref = useRef();

  useFrame(() => {
    // ref.current.rotation.x += 0.005;
    // ref.current.rotation.y += 0.0075;
  });

  useEffect(() => {
    GenTools.basicTraverse(scene);
  }, [scene]);

  useEffect(() => {
    GenTools.applyGlass(scene);
  }, [scene, exMetal]);

  return (
    <Suspense fallback={null}>
      <primitive ref={ref} scale={[0.1, 0.1, 0.1]} object={scene} />
    </Suspense>
  );
}

export default Floor15;
