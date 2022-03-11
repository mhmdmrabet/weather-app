import { Box } from "@mui/system";
import { Navbar } from "./Navbar";
import { SearchBar } from "./SearchBar";
import Weather from "./Weather";
import { blue } from "@mui/material/colors";
import { useState, useEffect } from "react";

function App() {
  const [cityName, setCityName] = useState("");

  const [geoCoords, setgeoCoords] = useState({
    latitude: 48.856614,
    longitude: 2.3522219,
  });

  function handleSubmit(newCityName: string) {
    setCityName(newCityName);
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setgeoCoords({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Box
          component="span"
          display="flex"
          flexDirection="column"
          gap={2}
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          bgcolor={blue[50]}
        >
          <SearchBar cityName={cityName} onSubmit={handleSubmit} />
          <Weather cityName={cityName} geoCoords={geoCoords} />
        </Box>
      </main>
    </>
  );
}

export default App;
