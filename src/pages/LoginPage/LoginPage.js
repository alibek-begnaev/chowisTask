import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "axios-hooks";

export default function LoginPage() {
  const history = useHistory();

  const [{ data: response, loading, error }, executePost] = useAxios(
    {
      headers: { authorization: "" },
      url: `/auth/login`,
      method: "POST",
    },
    { manual: true }
  );

  useEffect(() => {
    if (!!response) {
      window.localStorage.setItem("token", response.token);

      setTimeout(() => {
        history.push("/");
      }, 1000);
    }
  }, [response]);
  useEffect(() => {
    if (error) {
      alert(error?.response);
    }
  }, [error]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    executePost({
      data: {
        ...formData,
      },
    });
  };
  return (
    <Container
      style={{
        boxShadow:
          "0px 4px 6px -1px rgba(0,0,0,0.1) , 0px 2px 4px -1px rgba(0,0,0,0.06) ",
        backgroundColor: "white",
        borderRadius: 3,
      }}
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("username", {
              required: true,
            })}
            variant="outlined"
            margin="normal"
            fullWidth
            label="username"
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("password", {
              required: true,
            })}
            label="Password"
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
        {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
      </Box>
      {/* </Box> */}
    </Container>
  );
}
