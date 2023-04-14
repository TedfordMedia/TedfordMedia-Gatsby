import React, { useEffect } from 'react';
import { Html } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";

import "./style.css";

function CountryCube(props) {
  const flagUrl = props.country && props.country.flag ? props.country.flag : '';
  const scale = 1;
  const flagWidth = 3;
  const flagHeight = 2;
  const scaleOfLargest = 4;
  const tmpPos = props.country.index * (scale * 1.1);
  const [map1] = useLoader(TextureLoader, [flagUrl]);

  const populationPreceeding = props.countries.reduce((total, country) => {
    if (country.index < props.country.index) {
      return total + country.population;
    }
    return total;
  }, 0)

  const largestPopulation = props.countries[0].population;
  const millionsPerMetre = largestPopulation / scaleOfLargest;

  return (
    <mesh name={'mesh' + props.country.name} scale={scaleOfLargest * props.country.population / largestPopulation}
      position={[(populationPreceeding / millionsPerMetre) * flagWidth, 0, 0]}
    >
      <Html
        transform
        distanceFactor={3}
        position={[0, -1, 1.51]}
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