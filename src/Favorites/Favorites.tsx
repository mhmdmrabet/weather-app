import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ClearIcon from "@mui/icons-material/Clear";
import { Divider, IconButton, Typography } from "@mui/material";

const myFav = [
  { id: 1, name: "Paris" },
  { id: 2, name: "Sidi-slimane" },
  { id: 3, name: "Djerba" },
];

export function Favorites() {
  const handleDelete = (id: number) => {
    console.log({ id });
  };

  const jsxElement: React.ReactElement[] = myFav.map(({ id, name }) => (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          role={undefined}
          aria-label="delete"
          onClick={() => handleDelete(id)}
        >
          <ClearIcon color="error" />
        </IconButton>
      }
      disablePadding
      key={id}
    >
      <ListItemButton>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "2em",
          fontWeight: "bold",
          padding: 1,
        }}
      >
        Mes favoris
      </Typography>
      <Divider />
      <List dense={false}>{jsxElement}</List>
    </Box>
  );
}
