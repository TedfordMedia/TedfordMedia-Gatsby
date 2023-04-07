import React from "react";
import { Box } from "@react-three/drei";

const Floor = () => (
  <Box
    receiveShadow
    args={[30, 30, 10]}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, -5.01, 1.6]}
  >
    <meshStandardMaterial attach="material" color={"#581845"} />
  </Box>
);

export default Floor;
