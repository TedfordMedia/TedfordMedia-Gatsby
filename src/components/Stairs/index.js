import React, { useEffect, Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GenTools from "/src/GenTools";
import { useLoader } from "@react-three/fiber";
import useSceneStore from "/src/useSceneStore";

function Stairs() {
    const { scene } = useLoader(GLTFLoader, "/models/stairs.glb");
    useEffect(() => {
        GenTools.basicTraverse(scene);
    }, [scene]);

    return (
        <Suspense fallback={null}>
            <primitive scale={[0.1, 0.1, 0.1]} object={scene} />
        </Suspense>
    );
}

export default Stairs;