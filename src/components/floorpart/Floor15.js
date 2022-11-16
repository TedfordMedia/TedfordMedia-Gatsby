import React, { useEffect, Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GenTools from "/src/GenTools";
import { useLoader } from "@react-three/fiber";
import useSceneStore from "/src/useSceneStore";

function Floor15() {
  const { scene } = useLoader(GLTFLoader, "/models/fl15.glb");

  const exMetal = useSceneStore((state) => state.exMetal);
  console.log("exmetal floor15", exMetal);
  useEffect(() => {
    GenTools.basicTraverse(scene);
  }, [scene]);

  useEffect(() => {
    GenTools.applyGlass(scene);
  }, [scene, exMetal]);

  return (
    <Suspense fallback={null}>
      <primitive scale={[0.1, 0.1, 0.1]} object={scene} />
    </Suspense>
  );
}

export default Floor15;
