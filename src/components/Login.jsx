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
import { Maximize } from "@mui/icons-material";

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
        <Grid
          container
          // direction={matchDownSM ? "column-reverse" : "row"}
          justifyContent="center"
        >
          <Grid item xs={12} sx={{ padding: "5px", height: "1" }}>
            <form>
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
                  id="email"
                  name="email"
                  label="Email"
                  value=""
                  sx={{
                    width: "90%",
                  }}
                />
                <TextField
                  sx={{
                    width: "90%",
                  }}
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value=""
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
                <Typography
                  // component={Link}
                  // to="/pages/register/register3"
                  variant="subtitle2"
                  padding="25px"
                >
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
