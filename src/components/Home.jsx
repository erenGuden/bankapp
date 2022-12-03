import * as React from "react";
import AccountCard from "./AccountCard";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Divider, Grid } from "@mui/material";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const id = localStorage.getItem("id");
  const baseurl = `http://localhost:3000/api/accounts?userId=${id}`;
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    axios.get(baseurl).then((response) => {
      setAccounts(response.data);
    });
  }, []);

  return (
    <Grid>
      <Navbar />
      <Stack
        padding={10}
        spacing={3}
        divider={<Divider orientation="vertical" />}
        justifyContent="center"
        sx={{ alignItems: "center" }}
      >
        <Typography
          color="black"
          variant="caption"
          fontSize="26px"
          fontWeight="bold"
        >
          Welcome, Username
        </Typography>
        {accounts.map((account) => (
          <AccountCard account={account} key={account._id}/>
        ))}
        <Button
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: "lightblue",
            width: "40%",
          }}
          type="submit"
        >
          Create new account
        </Button>
      </Stack>
    </Grid>
  );
};

export default Home;
