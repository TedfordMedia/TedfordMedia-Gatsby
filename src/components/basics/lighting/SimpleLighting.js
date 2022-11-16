import React from "react";
import useSceneStore from "/src/useSceneStore";

const SimpleLighting = () => {
const dirShadowBias = useSceneStore((state) => state.dirShadowBias);
const ambientIntensity = useSceneStore((state) => state.ambientIntensity);

console.log('ambientIntensity', ambientIntensity);
  return (
 

    <group name="lighting">
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
        shadow-radius={2}
        shadow-bias={-dirShadowBias}
        //  shadow-camera-far={50}
        //       shadow-camera-left = {-10}
        //       shadow-camera-right = {10}
        //       shadow-camera-top = {10}
        //       shadow-camera-bottom = {-10}
        position={[10, 25, 37]}
        intensity={1}
        castShadow
        shadow-camera-zoom={2}
      />
    </group>
  );
};

export default SimpleLighting;
