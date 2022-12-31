import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Logo from "../assets/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const LogoStyled = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  padding: "42px",
  color: "black",
  fontWeight: "bold"
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
          <ButtonStyled href="/">HOME</ButtonStyled>
          <ButtonStyled href="/transactions">TRANSACTIONS</ButtonStyled>
          <ButtonStyled href="/profile">PROFILE</ButtonStyled>
          <Button
            onClick={onClick}
            sx={{
              justifyContent: "flex-end",
              flexGrow: "1 ",
              color: "black",
              display: { xs: "none", sm: "flex" },
            }}
            startIcon={
              <LogoutIcon sx={{ display: { xs: "none", sm: "block" } }} />
            }
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
