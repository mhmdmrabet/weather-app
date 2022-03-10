import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, LinearProgress } from "@mui/material";
import { useGetWeatherByUserLocationQuery } from "../services/weather";
import { useEffect, useState } from "react";

export default function Weather() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [status, setStatus] = useState("");

  console.log({ longitude, latitude });

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("");
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const { data, error, isLoading } = useGetWeatherByUserLocationQuery({
    latitude,
    longitude,
  });

  const myDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(Date.now());

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Card sx={{ width: 350, minHeight: 400 }}>
      {error ? (
        <>{status}</>
      ) : isLoading ? (
        <LinearProgress />
      ) : data ? (
        <>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              À {data.name}, le {myDate}
            </Typography>
            <Box sx={{ textAlign: "center", my: 5 }}>
              <Box
                component="img"
                alt="The house from the offer."
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              />
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "end" }}>
            <Button disabled size="small" variant="contained" color="secondary">
              Ajouter a vos favoris
            </Button>
          </CardActions>
        </>
      ) : null}
    </Card>
  );
}
