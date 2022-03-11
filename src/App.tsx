import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/system";
import { Navbar } from "./Navbar";
import { blue } from "@mui/material/colors";
import { useState, useEffect } from "react";
import { SearchBar, WeatherInfo } from "./Weather";
import { Login, SignIn, SignUp } from "./Auth";

function App() {
  const [cityName, setCityName] = useState("");
  const [user, SetUser] = useState("");

  const [geoCoords, setgeoCoords] = useState({
    latitude: 0,
    longitude: 0,
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
        <Navbar user={user} />
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
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchBar cityName={cityName} onSubmit={handleSubmit} />
                  <WeatherInfo cityName={cityName} geoCoords={geoCoords} />
                </>
              }
            />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Box>
      </main>
    </>
  );
}

export default App;
