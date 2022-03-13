import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Alert,
  Divider,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { URL_BACK } from "../utils/urlBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { APIGetUsersFavoriteCities } from "../api";

interface IState {
  status: "pending" | "resolved" | "rejected" | "idle";
  cities: any | null;
  error: unknown | null | boolean;
}

export function Favorites({ onClick }: { onClick: (name: string) => void }) {
  let navigate = useNavigate();

  const [state, setState] = useState<IState>({
    status: "idle",
    cities: null,
    error: null,
  });

  const [errorMsg, setErrorMsg] = useState(
    "This is a error alert — check it out!"
  );

  const { status, cities, error } = state;

  useEffect(() => {
    async function effect() {
      const token = window.localStorage.getItem("token");

      if (token) {
        setState({ ...state, status: "pending" });
        const result = await APIGetUsersFavoriteCities(token);
        setState({
          error: false,
          cities: result.data?.data,
          status: "resolved",
        });
        if (result.error) {
          if (typeof result.error === "string") {
            setErrorMsg(result.error);
          }
          setState({ ...state, error: true, status: "rejected" });
        }
      }
    }
    effect();
    return;
  }, []);

  const deleteFavorite = async (id: number) => {
    const token = window.localStorage.getItem("token");

    if (!token) return;
    try {
      const response = await axios.request({
        method: "DELETE",
        url: `${URL_BACK}/users/cities/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        const newFav = state.cities.filter((element: any) => element.id !== id);
        setState({ ...state, cities: newFav, status: "resolved" });
      } else {
        throw new Error("Weather not found");
      }
    } catch (error) {
      setState({ ...state, error, status: "rejected" });
    }
  };

  const handleDelete = (id: number) => {
    deleteFavorite(id);
  };

  let component;
  switch (status) {
    case "pending":
      component = <LinearProgress />;
      break;
    case "resolved":
      component = cities?.map(({ id, name }: { id: number; name: string }) => (
        <ListItem
          onClick={() => {
            onClick(name);
            navigate("/");
          }}
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
      break;
    case "rejected":
      component = <></>;
      break;
    case "idle":
      component = "La liste des favoris n'as pas été récupéré.";
      break;
    default:
      break;
  }

  return (
    <>
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
        <List dense={false}>{component}</List>
      </Box>
      {error && (
        <Alert severity="error" color="error">
          {errorMsg}
        </Alert>
      )}
    </>
  );
}
