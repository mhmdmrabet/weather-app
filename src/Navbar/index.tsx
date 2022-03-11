import { Link } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Thermostat } from "@mui/icons-material";
import axios from "axios";
export const Navbar = ({
  user,
  setUserToken,
}: {
  user: string;
  setUserToken: (token: string) => void;
}) => {
  async function logout() {
    const token = window.localStorage.getItem("token");
    setUserToken("");
    try {
      await axios.delete(
        `https://weather-app-back-powerz.herokuapp.com/api/v1/logout`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = () => logout();

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
              <Thermostat sx={{ mr: 1 }} />
              WeatherApp
            </Typography>
            {user ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to={"/login"}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  );
};
