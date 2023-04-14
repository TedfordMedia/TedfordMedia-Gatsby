import React from 'react';
import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import "./style.css";

function CountryCube(props) {
  const flagUrl = props.country.flag;
  const scale = 1;
  const flagWidth = 3;
  const flagHeight = 2;
  const tmpPos = props.country.index * (scale * 1.1);
  const [map1] = useLoader(TextureLoader, [flagUrl]);
  console.log('props.totalPopulation', props.totalPopulation);
  const populationPreceeding = props.countries.reduce((total, country) => {
    if (country.index < props.country.index) {
      return total + country.population;
    }
    return total;
  }, 0)
  console.log('hello populatin preceeding ', populationPreceeding)

  return (
    <mesh scale={4}
      position={[flagWidth * props.country.index * 1.1, 0, 0]}
    >
      <Html
        transform
        distanceFactor={3}
        position={[0, 0, 0]}
        style={{
          width: "150px",
        }}>
        <div className="label">{props.country.name} {(props.country.population / 1000000).toFixed(1)}m </div>
      </Html>
      <boxGeometry args={[flagWidth, flagHeight, flagWidth]} />
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