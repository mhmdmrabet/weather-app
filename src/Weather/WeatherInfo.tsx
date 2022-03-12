import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, LinearProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { URL_BACK } from "../utils/urlBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface IState {
  status: "pending" | "resolved" | "rejected" | "idle";
  weather: any | null;
  error: unknown | null;
}

export function WeatherInfo({
  cityName,
  geoCoords,
  userToken,
}: {
  cityName: string;
  geoCoords: {
    longitude: number;
    latitude: number;
  };
  userToken: string;
}) {
  let navigate = useNavigate();

  const [state, setState] = useState<IState>({
    status: cityName ? "pending" : "idle",
    weather: null,
    error: null,
  });

  const { latitude, longitude } = geoCoords;

  const { status, weather, error } = state;

  useEffect(() => {
    async function effect() {
      try {
        setState({ ...state, status: "pending" });
        const response = await fetch(
          `${URL_BACK}/weather/?lon=${longitude}&lat=${latitude}`
        );
        if (response.ok) {
          const result = await response.json();
          setState({ ...state, weather: result, status: "resolved" });
        } else {
          throw new Error("Weather not found");
        }
      } catch (error) {
        setState({ ...state, error, status: "rejected" });
      }
    }
    effect();
  }, [geoCoords]);

  useEffect(() => {
    if (!cityName) {
      return;
    }

    async function effect() {
      try {
        setState({ ...state, status: "pending" });
        const response = await fetch(`${URL_BACK}/weather/${cityName}`);
        if (response.ok) {
          const result = await response.json();
          setState({ ...state, weather: result, status: "resolved" });
        } else {
          throw new Error("Weather not found");
        }
      } catch (error) {
        setState({ ...state, error, status: "rejected" });
      }
    }
    effect();
  }, [cityName]);

  const addFavorite = async () => {
    const token = window.localStorage.getItem("token");
    if (!token) return;
    try {
      await axios.request({
        method: "POST",
        url: `${URL_BACK}/users/cities/${weather?.name}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/favorites");
    } catch (error) {
      console.log(error);
      navigate("/favorites");
    }
  };

  const handleAddFavorite = () => {
    addFavorite();
  };

  const myDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(Date.now());

  let component;
  switch (status) {
    case "pending":
      component = <LinearProgress />;
      break;
    case "resolved":
      component = (
        <>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {weather?.name}, le {myDate}
            </Typography>
            <Box sx={{ textAlign: "center", my: 5 }}>
              <Box
                component="img"
                alt="The house from the offer."
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
              />
            </Box>
            <Box>
              <Typography gutterBottom variant="h6" component="div">
                Temperature actuel :{" "}
                <span style={{ fontWeight: "bold" }}>
                  {Math.round(weather?.main.temp)}°
                </span>
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "end" }}>
            <Button
              disabled={userToken ? false : true}
              size="small"
              variant="contained"
              color="info"
              onClick={handleAddFavorite}
            >
              Ajouter a vos favoris
            </Button>
          </CardActions>
        </>
      );
      break;
    case "rejected":
      component = <></>;
      break;
    case "idle":
      component = "Submit a city";
      break;
    default:
      break;
  }

  return <Card sx={{ width: 350, minHeight: 400 }}>{component}</Card>;
}
