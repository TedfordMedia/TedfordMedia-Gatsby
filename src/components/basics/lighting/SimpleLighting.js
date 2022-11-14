import React from "react";

const SimpleLighting = () => (
  <group name="lighting">
    <hemisphereLight intensity={0.1} />
    <directionalLight
      shadow-mapSize-height={1024}
      shadow-mapSize-width={1024}
      shadow-radius={3}
      shadow-bias={-0.0001}
      //  shadow-camera-far={50}
      //       shadow-camera-left = {-10}
      //       shadow-camera-right = {10}
      //       shadow-camera-top = {10}
      //       shadow-camera-bottom = {-10}
      position={[67, 19, 127]}
      intensity={1}
      castShadow
      shadow-camera-zoom={2}
    />
  </group>
);

export default SimpleLighting;
