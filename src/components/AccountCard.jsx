import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { alignItems } from "styled-system";

const AccountCard = ({ account }) => {
  return (
    <Card
      sx={{
        width: "40%",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 13, mb: 2 }}
          color="text.primary"
          gutterBottom
        >
          Account name: {account.name}
        </Typography>
        <Typography variant="h5" component="div">
          Balance: ${account.balance}
        </Typography>
        <Typography sx={{ mt: 3.5, mb: 0.5 }} color="text.secondary">
          AccountID: {account._id}
        </Typography>
      </CardContent>
      <CardActions justify="center" sx={{ alignItems: "center" }}>
        <Button size="small">Account details</Button>
      </CardActions>
    </Card>
  );
};

export default AccountCard;
