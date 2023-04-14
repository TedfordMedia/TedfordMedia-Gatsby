import Layout from "@components/layoutwidellh";
import * as THREE from 'three'
import { css } from '@emotion/core'
import React, { useState, useEffect, useRef } from 'react';
import { OrbitControls, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Floor from "@components/basics/flooring/Floor";
import CountryCube from './CountryCube'



const MyPage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => {
        const sortedCountries = data.sort((a, b) => {
          return b.population - a.population;
        });
        const top30Countries = sortedCountries.slice(0, 30);
        const countriesData = top30Countries.map((country, index) => ({
          index: index,
          flag: country.flags.png,
          name: country.name.common,
          population: country.population
        }));
        setCountries(countriesData);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Layout>
      {/* <div>
        <h1>List of Countries</h1>
        <ul>
          {countries.map(country => (
            <li key={country.name}>{country.name} {(country.population / 1000000).toFixed(2)}</li>
          ))}
        </ul>
      </div> */}

      <div className={'mydiv'}
        css={css` 
        height: 100%;
        overflow: hidden;
      `}>
        <Canvas
          shadows
          shadowMap
          camera={{ position: [-20, 10, 10], fov: 42 }}
          onCreated={({ gl, camera, scene }) => {
            scene.background = new THREE.Color(0xa2b9e7);
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFShadowMap;
            gl.shadowMap.autoUpdate = true;
            gl.toneMapping = THREE.ACESFilmicToneMapping;
          }}>

          <ambientLight intensity={.4} />
          <Floor />

          {countries.map(country => (
            <CountryCube key={country.name} country={country} />
          ))}

          {/* <Sky scale={100} sunPosition={[400, 500, -1000]} turbidity={0.1} /> */}
          <OrbitControls
          // enableDamping
          // dampingFactor={0.2}
          // maxDistance={50}
          // autoRotate autoRotateSpeed={-.2}
          />
        </Canvas>
      </div>
    </Layout>
  );
};

export default MyPage;