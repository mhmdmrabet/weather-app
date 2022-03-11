import { Link as RouterLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const theme = createTheme();

type IFormInput = {
  email: string;
  password: string;
};

export function SignUp() {
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [error, setError] = useState(false);

  async function signup(data: { email: string; password: string }) {
    try {
      const response = await axios.post(
        `https://weather-app-back-powerz.herokuapp.com/api/v1/register`,
        data
      );
      if (response.status === 201) {
        navigate("/");
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      setError(true);
      reset({ email: "", password: "" });
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    signup(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Créer un compte
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message}
              {...register("email", { required: "Ce champs est recquis" })}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={errors.password ? true : false}
              helperText={errors.password && errors.password.message}
              {...register("password", {
                required: "Ce champs est recquis",
                minLength: {
                  value: 6,
                  message: "Le nombre de caractère doit être supérieur à 6",
                },
              })}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Créer un compte
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to={"/login"} variant="body2">
                  {"Vous avez un compte ? Connectez-vous !"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {error && (
        <Alert severity="error" color="error">
          This is a error alert — check it out!
        </Alert>
      )}
    </ThemeProvider>
  );
}
