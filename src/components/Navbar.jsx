import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Logo from "../assets/logo.png";
import { styled } from "@mui/system";

const pages = ["Home", "Transaction", "Profile"];

const LogoStyled = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "lightblue", maxHeight: "100vh" }}
    >
      <Container maxWidth="xl">
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
          {pages.map((page) => (
            <Button
              key={page}
              sx={{
                padding: "20px",
                color: "black",
              }}
            >
              {page}
            </Button>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
