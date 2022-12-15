import React, { useEffect, Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GenTools from "/src/GenTools";
import { useLoader } from "@react-three/fiber";

function LightRoomMap() {
    const { scene } = useLoader(GLTFLoader, "/models/lightroom.glb");
    useEffect(() => {
        GenTools.basicTraverse(scene);
    }, [scene]);

    return (
        <Suspense fallback={null}>
            <primitive scale={[1,1,1]} position={[0,0,0]} object={scene} />
        </Suspense>
    );
}

export default LightRoomMap;