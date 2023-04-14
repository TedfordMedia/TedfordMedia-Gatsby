import Layout from "@components/layoutwidellh";
import * as THREE from 'three'
import { css } from '@emotion/core'
import React, { useState, useEffect, Suspense } from 'react';
import { OrbitControls, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CountryCube from './CountryCube'


const MyPage = () => {
  const [countries, setCountries] = useState([]);
  const [totalPopulation, setTotal] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => {
        const sortedCountries = data.sort((a, b) => {
          return b.population - a.population;
        });
        const top30Countries = sortedCountries.slice(0, 40);
        const countriesData = top30Countries.map((country, index) => ({
          index: index,
          flag: country.flags.png,
          name: country.name.common,
          population: country.population
        }));

        setCountries(countriesData);
        setTotal(top30Countries.reduce((total, country) => {
          return total + country.population;
        }, 0))
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
          camera={{ position: [43, 6, 30], fov: 36 }}
          onCreated={({ gl, camera, scene }) => {
            scene.background = new THREE.Color(0xa2b9e7);
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFShadowMap;
            gl.shadowMap.autoUpdate = true;
            gl.toneMapping = THREE.ACESFilmicToneMapping;
          }}>

          <ambientLight intensity={.4} />

          <group position={[-7, 0, 0]}>
            {countries.map(country => (
              <Suspense key={country.name} fallback={<Html>Loading...</Html>}>


                <CountryCube key={country.name} country={country} totalPopulation={totalPopulation} countries={countries} />
              </Suspense>
            ))}
          </group>

          <OrbitControls
            target={[17, 0, 0]}
            enableDamping
            dampingFactor={0.2}
          />
        </Canvas>
      </div>
    </Layout>
  );
};

export default MyPage;