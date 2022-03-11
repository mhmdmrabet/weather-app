import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, LinearProgress } from "@mui/material";

export default function Weather() {
  const { data, error, isLoading } = {
    data: {
      name: "Paris",
      main: {
        temp: 16.43,
      },
      weather: [{ icon: "04d" }],
    },
    error: null,
    isLoading: false,
  };

  const myDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(Date.now());

  return (
    <Card sx={{ width: 350, minHeight: 400 }}>
      {error ? (
        <>ERROR</>
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
            <Box>
              <Typography gutterBottom variant="h6" component="div">
                Temperature actuel :{" "}
                <span style={{ fontWeight: "bold" }}>
                  {Math.round(data.main.temp)}°
                </span>
              </Typography>
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
