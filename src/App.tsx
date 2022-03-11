import { Box } from "@mui/system";
import { Navbar } from "./Navbar";
import { SearchBar } from "./SearchBar";
import Weather from "./Weather";
import { blue } from "@mui/material/colors";
import { useState, useEffect } from "react";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [status, setStatus] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("");
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
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
          <SearchBar />
          <Weather />
        </Box>
      </main>
    </>
  );
}

export default App;
