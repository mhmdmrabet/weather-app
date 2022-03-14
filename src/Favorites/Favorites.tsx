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
import { useNavigate } from "react-router-dom";
import {
  APIDeleteCityFromUsersFavoriteCities,
  APIGetUsersFavoriteCities,
} from "../api";
import { IFavoriteState } from "./../type";

export function Favorites({
  onClick,
}: {
  onClick: (name: string) => void;
}): JSX.Element {
  let navigate = useNavigate();

  const [token] = useState<string>((): string => {
    return window.localStorage.getItem("token") ?? "";
  });

  const [state, setState] = useState<IFavoriteState>({
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
    if (!token) return;
    setState({ ...state, status: "pending" });
    const result = await APIDeleteCityFromUsersFavoriteCities(token, id);
    if (result.error) {
      if (typeof result.error === "string") {
        setErrorMsg(result.error);
      }
      setState({ ...state, error: true, status: "rejected" });
      return;
    }
    const newFav = state.cities.filter((element: any) => element.id !== id);
    setState({ ...state, cities: newFav, status: "resolved" });
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
      component = cities?.map(
        ({ id, name }: { id: number; name: string }): JSX.Element => (
          <ListItem
            onClick={() => {
              onClick(name);
              navigate(`/`);
            }}
            secondaryAction={
              <IconButton
                edge="end"
                role={undefined}
                aria-label="delete"
                onClick={(event) => {
                  event.stopPropagation();
                  if (
                    window.confirm(
                      `Etes-vous sur de vouloir supprimer "${name}" de vos favoris ?`
                    )
                  ) {
                    handleDelete(id);
                  }
                }}
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
        )
      );
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
