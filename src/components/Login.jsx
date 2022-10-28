import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../assets/logo.png";
import { styled } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";

const GridStyled = styled(Grid)(({ theme }) => ({
  width: "400px",
  height: "550px",
  backgroundColor: "white",
  [theme.breakpoints.down("sm")]: {
    height: "100vh",
    width: "100vw",
  },
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();

    // POST METHOD pass username and password //
    axios
      .post(`http://localhost:3000/api/auth`, { username, password })
      .then((response) => {
        console.log(response.data.id);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ backgroundColor: "lightblue", minHeight: "100vh" }}
    >
      <GridStyled container display="flex" justifyContent="center">
        <Grid item maxHeight="64px">
          <Box
            component="img"
            sx={{
              height: 64,
              padding: "25px",
            }}
            alt="BankApp logo"
            src={Logo}
          />
          <Divider sx={{ padding: "3px" }} />
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} sx={{ padding: "5px", height: "1" }}>
            <form onSubmit={submitHandler}>
              <Stack alignItems="center" justifyContent="center" spacing={1}>
                <Typography
                  color="grey"
                  variant="caption"
                  fontSize="16px"
                  fontWeight="bold"
                >
                  Enter your credentials to continue
                </Typography>

                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  sx={{
                    width: "90%",
                  }}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <TextField
                  sx={{
                    width: "90%",
                  }}
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    width: "90%",
                  }}
                  type="submit"
                >
                  Login
                </Button>
                <Typography variant="subtitle2" padding="25px">
                  Don't have an account?
                </Typography>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </GridStyled>
    </Grid>
  );
};
export default Login;
