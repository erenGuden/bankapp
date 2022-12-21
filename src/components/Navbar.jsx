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

const pages = ["Home", "Transaction", "Profile"];
const LogoStyled = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/login");
  };

  const handleClick = () => {
    if (pages[0]) {
      navigate("/");
      console.log("test");
    }
    if (pages[1]) {
      navigate("/transactions");
    }
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
          {pages.map((page) => (
            <Button
              key={page}
              sx={{
                padding: "40px",
                color: "black",
              }}
              onClick={handleClick}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={onClick}
            sx={{ justifyContent: "flex-end", flexGrow: "1 ", color: "black" }}
            startIcon={<LogoutIcon />}
          >
            LOG OUT
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
