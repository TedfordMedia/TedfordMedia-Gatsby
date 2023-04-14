import Layout from "@components/layoutwidellh";
import * as THREE from 'three'
import { css } from '@emotion/core'
import React, { useState, useEffect } from 'react';
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
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

      <div className={'mydiv'}
        css={css` 
        height: 100%;
        overflow: hidden;
      `}>
        <Canvas
          shadows
          shadowMap
          camera={{ position: [-2, 2, 10], fov: 42 }}
          onCreated={({ gl, camera, scene }) => {
            scene.background = new THREE.Color(0xa2b9e7);
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFShadowMap;
            gl.shadowMap.autoUpdate = true;
            gl.toneMapping = THREE.ACESFilmicToneMapping;
          }}>

          <ambientLight intensity={.4} />

          {countries.map(country => (
            <CountryCube key={country.name} country={country} />
          ))}

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