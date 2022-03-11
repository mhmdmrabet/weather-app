import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/system";
import { Navbar } from "./Navbar";
import { blue } from "@mui/material/colors";
import { useState, useEffect } from "react";
import { SearchBar, WeatherInfo } from "./Weather";
import { RequireAuth, SignIn, SignUp } from "./Auth";
import { Favorites } from "./Favorites";

function App() {
  const [cityName, setCityName] = useState("");
  const [userToken, setUserToken] = useState(
    () => window.localStorage.getItem("token") ?? ""
  );

  useEffect(() => {
    window.localStorage.setItem("token", userToken);
    if (userToken) {
      console.log("test");
    }
  }, [userToken]);

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
        <Navbar user={userToken} setUserToken={setUserToken} />
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
                  <WeatherInfo
                    cityName={cityName}
                    geoCoords={geoCoords}
                    userToken={userToken}
                  />
                </>
              }
            />
            <Route
              path="/login"
              element={<SignIn setUserToken={setUserToken} />}
            />
            <Route
              path="/signup"
              element={<SignUp setUserToken={setUserToken} />}
            />
            <Route
              path="/favorites"
              element={
                <RequireAuth userToken={userToken}>
                  <Favorites />
                </RequireAuth>
              }
            ></Route>
          </Routes>
        </Box>
      </main>
    </>
  );
}

export default App;
