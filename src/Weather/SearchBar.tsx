import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export function SearchBar({
  onSubmit,
}: {
  onSubmit: (cityName: string) => void;
}) {
  const initialCityName = "";

  const [cityName, setCityName] = useState(initialCityName);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    onSubmit(cityName);
    setCityName("");
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCityName(event.target.value);
  }

  return (
    <Box
      onSubmit={handleSubmit}
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
        value={cityName}
        name="city"
        onChange={handleChange}
      />
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "column-reverse",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="success"
          disabled={!cityName.length}
        >
          Soumettre
        </Button>
      </Box>
    </Box>
  );
}
