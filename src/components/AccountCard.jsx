import { styled } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

const CardStyled = styled(Card)(({ theme }) => ({
  backgroundColor: "white",
  width: "65vh",
  [theme.breakpoints.down("sm")]: {
    width: "40vh",
  },
}));

// Format amount as in currency
function currencyFormat(num) {
  return "$" + (num || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const AccountCard = ({ account }) => {
  return (
    <CardStyled>
      <Card>
        <CardContent>
          <Typography
            sx={{ fontSize: 17, mb: 2, fontFamily: "bold", color: "black" }}
            color="text.primary"
            gutterBottom
          >
            <strong>{account.name}</strong>
          </Typography>
          <Typography variant="h5" component="div">
            {currencyFormat(account.balance)}
          </Typography>
        </CardContent>
        <CardActions justify="center" sx={{ alignItems: "center" }}>
          <Button href={`account-details?id=${account._id}`} size="small">
            Account details
          </Button>
        </CardActions>
      </Card>
    </CardStyled>
  );
};

export default AccountCard;
