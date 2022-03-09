import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export function SearchBar() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: 350 },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="Ville"
          id="outlined-size-normal"
          placeholder="Entrez le nom d'une ville ..."
          fullWidth
          size="medium"
        />
      </div>
    </Box>
  );
}
