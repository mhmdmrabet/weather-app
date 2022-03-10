import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export function SearchBar() {
  return (
    <Box
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
      />
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "column-reverse",
        }}
      >
        {/* TODO Add loading style */}
        <Button variant="contained" color="success">
          Soumettre
        </Button>
      </Box>
    </Box>
  );
}
