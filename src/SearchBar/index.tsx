import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export function SearchBar() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");

  return (
    <Box
      onSubmit={(event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
          city: { value: string };
        };
        setSearchedCity(target.city.value);
        setCity("");
      }}
      component="form"
      sx={{
        m: 1,
        width: 350,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <TextField
        label="Ville"
        id="outlined-size-normal"
        placeholder="Entrez le nom d'une ville ..."
        fullWidth
        size="medium"
        value={city}
        name="city"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCity(event.target.value);
        }}
      />
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "column-reverse",
        }}
      >
        <Button type="submit" variant="contained" color="success">
          Soumettre
        </Button>
      </Box>
    </Box>
  );
}
