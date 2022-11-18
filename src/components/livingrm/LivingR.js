import React, { useEffect, Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GenTools from "/src/GenTools";
import { useLoader } from "@react-three/fiber";
import useSceneStore from "/src/useSceneStore";

function LivingR() {
  const { scene } = useLoader(GLTFLoader, "/models/untitled.glb");
  const exMetal = useSceneStore((state) => state.exMetal);

  useEffect(() => {
    GenTools.basicTraverse(scene);
    // GenTools.addLightMatLighting(scene);
  }, [scene]);

  useEffect(() => {
    GenTools.applyGlass(scene);
  }, [scene, exMetal]);

  return (
    <Suspense fallback={null}>
      <primitive scale={[0.3, 0.3, 0.3]} object={scene} />
    </Suspense>
  );
}

export default LivingR;
