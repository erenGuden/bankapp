import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const LogoStyled = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  padding: "42px",
  color: "black",
  background: "lightblue",
  fontWeight: "bold",
  fontSize: 15,
}));
const Navbar = () => {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "lightblue", maxHeight: "100vh" }}
    >
      <Container>
        <Toolbar disableGutters>
          <LogoStyled
            component="img"
            sx={{
              height: 64,
              padding: "15px",
            }}
            alt="BankApp logo"
            src={Logo}
          />
          <ButtonStyled href="/" disableRipple>
            HOME
          </ButtonStyled>
          <ButtonStyled href="/transactions" disableRipple>
            TRANSACTIONS
          </ButtonStyled>
          <ButtonStyled href="/profile" disableRipple>
            PROFILE
          </ButtonStyled>
          <Button
            onClick={onClick}
            sx={{
              justifyContent: "flex-end",
              flexGrow: "1 ",
              marginLeft: 30,
              maxWidth: 110,
              color: "black",
              fontSize: 15,
              display: { xs: "none", sm: "flex" },
            }}
            startIcon={
              <LogoutIcon sx={{ display: { xs: "none", sm: "block" } }} />
            }
            disableRipple
          >
            LOG OUT
          </Button>
          <LogoutIcon
            onClick={onClick}
            sx={{ color: "black", display: { xs: "block", sm: "none" } }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
