import Layout from "@components/layoutwidellh"; 


import React, { useState, useEffect } from 'react'; 

const MyPage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      const countryNames = data.map(country => country.name.common);
      setCountries(countryNames);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        <h1>List of Countries</h1>
        <ul>
          {countries.map(country => (
            <li key={country}>{country}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default MyPage;