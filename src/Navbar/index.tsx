import { Link } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Thermostat } from "@mui/icons-material";
import { APILogout } from "../api";

export const Navbar = ({
  user,
  setUserToken,
}: {
  user: string;
  setUserToken: (token: string) => void;
}) => {
  const handleLogout = async () => {
    const token = window.localStorage.getItem("token");
    if (!token) return;
    setUserToken("");
    return await APILogout(token);
  };

  return (
    <nav>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              sx={{
                flexGrow: 1,
                fontSize: "1.5em",
                fontWeight: "bold",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
              component={Link}
              to={"/"}
            >
              <Thermostat sx={{ mr: 1, fontSize: { sm: "1.5em" } }} />
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                WeatherApp
              </Box>
            </Typography>
            {user && (
              <>
                <Button color="inherit" component={Link} to={"/favorites"}>
                  vos favoris
                </Button>
                <Typography> | </Typography>
              </>
            )}

            {user ? (
              <Button color="inherit" onClick={handleLogout}>
                Déconnexion
              </Button>
            ) : (
              <Button color="inherit" component={Link} to={"/login"}>
                Connexion
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  );
};
