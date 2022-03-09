import { Box } from "@mui/system";
import { Navbar } from "./Navbar";
import { SearchBar } from "./SearchBar";
import Weather from "./Weather";
import { blue } from "@mui/material/colors";

function App() {
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
