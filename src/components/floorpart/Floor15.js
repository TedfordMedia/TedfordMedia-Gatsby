import React, { useMemo, Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GenTools from "/src/GenTools";
import { useLoader } from "@react-three/fiber";


function Floor15() {
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

export default Floor15;
