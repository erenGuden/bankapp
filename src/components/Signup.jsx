import Logo from "../assets/logo.png";
import axios from "axios";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const GridStyled = styled(Grid)(({ theme }) => ({
  width: "400px",
  backgroundColor: "white",
  [theme.breakpoints.down("sm")]: {
    height: "100vh",
    width: "100vw",
  },
}));

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [availability, setAvailability] = useState(true);

  const baseurl = `http://localhost:3000/api/users`;
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(baseurl, {
        username,
        password,
        address,
        securityQuestion,
        securityQuestionAnswer,
      })
      .then((response) => {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 7000);
      })
      .catch((error) => {
        setError(true);
        setError(error.response.data);
      });
  };

  const onChangeUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
    axios
      .get(`http://localhost:3000/api/users?username=${e.target.value}`)
      .then((response) => {
        if (response.data.length) {
          setAvailability(false);
        } else {
          setAvailability(true);
        }
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
        <Grid item maxHeight="84px">
          <Box
            component="img"
            sx={{
              height: 64,
              padding: "25px",
            }}
            alt="BankApp logo"
            src={Logo}
          />
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} sx={{ padding: "5px", height: "1" }}>
            <form onSubmit={submitHandler}>
              <Stack alignItems="center" justifyContent="center" spacing={1}>
                {success && (
                  <Alert sx={{ padding: "3px" }}>
                    <AlertTitle>
                      Your successfully created your account. Please login with
                      your credentials.
                    </AlertTitle>
                  </Alert>
                )}
                {!availability && (
                  <Typography
                    fontSize="17px"
                    display="flex"
                    justifyContent="center"
                    variant="outlined"
                    sx={{
                      backgroundColor: "red",
                      color: "white",
                      width: "90%",
                    }}
                  >
                    Username taken 
                  </Typography>
                )}
                {error && (
                  <Alert severity="error" sx={{ padding: "3px" }}>
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Typography
                  color="grey"
                  variant="caption"
                  fontSize="16px"
                  fontWeight="bold"
                >
                  Create your credentials to sign up
                </Typography>
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  sx={{
                    width: "90%",
                  }}
                  onChange={onChangeUsername}
                  value={username}
                  required
                />
                <TextField
                  sx={{
                    width: "90%",
                  }}
                  minLength="6"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <TextField
                  sx={{
                    width: "90%",
                  }}
                  minLength="6"
                  id="address"
                  name="address"
                  label="Address"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  required
                />
                <TextField
                  sx={{
                    width: "90%",
                  }}
                  minLength="6"
                  id="question"
                  name="question"
                  label="Security question"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setSecurityQuestion(e.target.value)}
                  value={securityQuestion}
                  required
                />
                <TextField
                  sx={{
                    width: "90%",
                  }}
                  id="answer"
                  name="answer"
                  label="Answer"
                  minLength="3"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setSecurityQuestionAnswer(e.target.value)}
                  value={securityQuestionAnswer}
                  required
                />
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    width: "90%",
                  }}
                  type="submit"
                  disabled={
                    !username ||
                    !password ||
                    !address ||
                    !securityQuestion ||
                    securityQuestionAnswer.length < 3 ||
                    !availability
                  }
                >
                  Create an account
                </Button>
                <Link
                  href="/login"
                  variant="subtitle2"
                  padding="25px"
                  to="/login"
                  color="inherit"
                >
                  Already have an account?
                </Link>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </GridStyled>
    </Grid>
  );
};

export default Signup;
