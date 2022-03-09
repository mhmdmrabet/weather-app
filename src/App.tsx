import { Box } from "@mui/system";
import { Navbar } from "./Navbar";
import { SearchBar } from "./SearchBar";
import Weather from "./Weather";

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
        >
          <SearchBar />
          <Weather />
        </Box>
      </main>
    </>
  );
}

export default App;
