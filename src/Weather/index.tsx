import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { yellow } from "@mui/material/colors";
import { Box } from "@mui/material";

export default function Weather() {
  const myDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(Date.now());
  if ("geolocation" in navigator) {
    /* la géolocalisation est disponible */
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log({ position });
    });
  } else {
    /* la géolocalisation n'est pas disponible */
    console.log("la géolocalisation n'est pas disponible ");
  }
  return (
    <Card sx={{ width: 400, minHeight: 400 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="240"
        image="https://www.parisinfo.com/var/otcp/sites/images/node_43/node_51/node_233/vue-sur-les-toits-de-la-tour-saint-jacques-%7C-740x380-%7C-%C2%A9-elodie-gutbrod-cr%C3%A9atividie/21581411-1-fre-FR/Vue-sur-les-toits-de-la-tour-Saint-Jacques-%7C-740x380-%7C-%C2%A9-Elodie-Gutbrod-Cr%C3%A9atividie.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Paris, le {myDate}
        </Typography>
        <Box sx={{ textAlign: "center", my: 5 }}>
          <WbSunnyIcon sx={{ color: yellow[600], fontSize: 70 }} />
        </Box>
      </CardContent>
      <CardActions sx={{ flexDirection: "row-reverse", mb: 1 }}>
        <Button size="medium" variant="contained">
          Ajouter a vos favoris
        </Button>
      </CardActions>
    </Card>
  );
}
