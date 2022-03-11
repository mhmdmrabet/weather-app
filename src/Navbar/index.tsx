import { Link } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Thermostat } from "@mui/icons-material";
export const Navbar = ({ user }: { user: string }) => {
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
              <Button color="inherit" onClick={() => {}}>
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
