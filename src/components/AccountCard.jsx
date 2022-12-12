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
  width: "45vh",
  [theme.breakpoints.down("sm")]: {
    width: "40vh",
  },
}));

// Format amount as in currency
function currencyFormat(num) {
  if (num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}

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
