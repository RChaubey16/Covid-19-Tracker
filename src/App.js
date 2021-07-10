import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  // STATE = How to write a variable in REACT <<<<< simple definition for state
  // USEEFFECT + Runs a piece of code based on a given condition

  // https://disease.sh/v3/covid-19/countries

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["worldwide"]);
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    // the code inside here will run once when the component (App component) loads and not again
    // it is dependeant on countries state and whenever the countries changes this piece of code will run.

    // Now the code inside this will be asynchronous why?
    // because async -> send a request, wait for it, do something with receieved info

    const getCountriesData = async () => {
      // fetch is JS function to fetch something
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States, United Kingdom
            value: country.countryInfo.iso2, // USA, UK
          }));

          // setCountries updates the country state with upto date data
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    // whenever a new country is selected from the dropdown menu, we need the new country to stick to the dropdown menu box
    const countryCode = event.target.value;

    // to fetch the worldwide stats :- https://disease.sh/v3/covid-19/countries/all
    // to fetch the data related to a specific country :- https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/countries/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // the below line, makes the selected country sticks to the dropdown menu box
        setCountry(countryCode);

        // All of the data from country response
        setCountryInfo(data);
      });
  };

  console.log("Country Info >>>>>>> ", countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/* Loop through all the countries and show a dropdown list 
            of the options */}

              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                );
              })}

              {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option2</MenuItem>
            <MenuItem value="worldwide">Option3</MenuItem>
            <MenuItem value="worldwide">Option4</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Death"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* Map */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          {/* Table */}
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
