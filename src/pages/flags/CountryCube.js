import React from 'react';
import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import "./style.css";

function CountryCube(country) {
  const flagUrl = country.country.flag;
  const scale = 1;
  const tmpPos = country.country.index * (scale * 1.1);
  const [map1] = useLoader(TextureLoader, [flagUrl]);

  return (
    <mesh
      position={[tmpPos, tmpPos, 0]}
    >
      <Html transform
        distanceFactor={3}
        position={[0, 0, 0]}
        style={{
          width: "150px",
        }}>
        <div className="label">{country.country.name} {country.country.population/1000000}m </div>
      </Html>
      <boxGeometry args={[3, 2, 2]} />
      <meshStandardMaterial attachArray="material" map={map1} />
      <meshBasicMaterial attachArray="material" map={map1} />
      <meshBasicMaterial attachArray="material" color="white" />
      <meshBasicMaterial attachArray="material" color="white" />
      <meshBasicMaterial attachArray="material" map={map1} />
      <meshBasicMaterial attachArray="material" map={map1} />
    </mesh>
  )
}
export default CountryCube;