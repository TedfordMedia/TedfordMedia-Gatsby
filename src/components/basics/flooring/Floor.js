import React from "react";
import { Plane } from "@react-three/drei";

const Floor = () => (
  <Plane
    receiveShadow
    args={[100, 100]}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, -0.2, 0]}
  >
    <meshPhongMaterial attach="material" color={"#ededed"} />
  </Plane>
);

export default Floor;
