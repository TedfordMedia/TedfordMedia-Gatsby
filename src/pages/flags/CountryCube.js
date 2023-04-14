import Layout from "@components/layoutwidellh";
import * as THREE from 'three'
import { css } from '@emotion/core'
import React, { useState, useEffect, useRef } from 'react';
import { OrbitControls, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Floor from "@components/basics/flooring/Floor";
import "./style.css";

function CountryCube(country) {
  const meshRef = useRef(null)
  const flagUrl = country.country.flag;
  console.log('flagurl', flagUrl);
  const tmpPos = country.country.index;
  const scale = 1;
  const [color, setColor] = useState('#00FF00'); // Set initial color to green

  useEffect(() => {
    const getRandomColor = () => {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      return randomColor;
    };
    setColor(getRandomColor());
  }, []);
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
        <div className="label">{country.country.name}</div>
        <img className="flaghtmlimage" src={flagUrl} alt={`${country.country.name} flag`} />
      </Html>
      <boxGeometry args={[scale, scale, scale]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
export default CountryCube;