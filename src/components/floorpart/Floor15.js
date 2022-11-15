import React, { useEffect, Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GenTools from "/src/GenTools";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";


function Floor15() {
  const { scene } = useLoader(GLTFLoader, "/models/fl15.glb");


  useEffect(() => {
    GenTools.basicTraverse(scene);
    GenTools.applyGlass(scene);
  }, [scene]);

  return (
    <Suspense fallback={null}>
      <primitive scale={[0.1, 0.1, 0.1]} object={scene} />
    </Suspense>
  );
}

export default Floor15;
