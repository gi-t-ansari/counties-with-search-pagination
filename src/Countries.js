import React, { useEffect, useState } from "react";

const cardStyle = {
  width: "200px",
  borderRadius: "10px",
  margin: "10px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "2.5px 2.5px 5px slategray",
  backgroundColor: "#64748b",
  color: "#fff"
};

const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center"
};

const imageStyle = {
  width: "150px",
  height: "100px"
};

const inputContainer = {
  display: "flex",
  justifyContent: "center",
  padding: "10px 20px"
};

const inputStyle = {
  padding: "10px 5px",
  width: "300px",
  border: "none",
  borderRadius: "7px",
  boxShadow: "2.5px 2.5px 5px slategray"
};

function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");
  const [endIndex, setEndIndex] = useState(12);

  useEffect(() => {
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        console.log(data);
      })
      .catch((error) => console.error("Error occurred while fetching", error));
  }, []);

  const getCountryName = (e) => {
    e.preventDefault();
    setSearchedCountry(e.target.value);
  };

  const filteredCountries = countries.filter((country) => {
    return country.common
      .toLowerCase()
      .includes(searchedCountry.toLowerCase());
  });

  return (
    <div>
      <div style={inputContainer}>
        <input
          type="text"
          placeholder="Search for Countries"
          style={inputStyle}
          onChange={getCountryName}
        />
      </div>
      <div style={containerStyle}>
        {filteredCountries.map((country) => (
          <div key={country.common} className="countryCard" style={cardStyle}>
            <img src={country.png} alt={country.common} style={imageStyle} />
            <h2>{country.common}</h2>
          </div>
        ))}
      </div>
      // {countries && (
      //   <div className="pagination">
      //     {endIndex >= filteredCountries.length ? (
      //       <></>
      //     ) : (
      //       <button onClick={() => setEndIndex((prevIndex) => prevIndex + 6)}>
      //         Show More
      //       </button>
      //     )}
      //     {endIndex > 12 ? (
      //       <button onClick={() => setEndIndex((prevIndex) => prevIndex - 6)}>
      //         Show Less
      //       </button>
      //     ) : (
      //       <></>
      //     )}
      //   </div>
      // )}
    </div>
  );
}

export default Countries;
