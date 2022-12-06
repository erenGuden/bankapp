import { styled } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { fontFamily } from "styled-system";

const CardStyled = styled(Card)(({ theme }) => ({
  backgroundColor: "white",
  width: "45vh",
  [theme.breakpoints.down("sm")]: {
    width: "40vh",
  },
}));

const AccountCard = ({ account }) => {
  return (
    <CardStyled>
      <Card>
        <CardContent>
          <Typography
            sx={{ fontSize: 13, mb: 2, fontFamily: "bold", color: "black" }}
            color="text.primary"
            gutterBottom
          >
            Account name: {account.name}
          </Typography>
          <Typography variant="h5" component="div">
            ${account.balance}
          </Typography> 
        </CardContent>
        <CardActions justify="center" sx={{ alignItems: "center" }}>
          <Button size="small">Account details</Button>
        </CardActions>
      </Card>
    </CardStyled>
  );
};

export default AccountCard;
