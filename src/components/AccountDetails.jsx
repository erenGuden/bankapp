import Navbar from "./Navbar";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

const AccountDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const accountId = searchParams.get("id");
  const [accountType, setAccountType] = useState();
  const [accountBalance, setAccountBalance] = useState();
  const [transactions, setTransactions] = useState([]);
  const transactionsUrl = `http://localhost:3000/api/transactions/${accountId}`;
  const baseurl = `http://localhost:3000/api/accounts/${accountId}`;

  const TableCellStyled = styled(TableCell)(({ theme }) => ({
    fontSize: "16px",
    [theme.breakpoints.down("sm")]: {
      align: "right",
    },
  }));

  useEffect(() => {
    axios.get(baseurl).then((response) => {
      setAccountBalance(response.data.balance);
      setAccountType(response.data.name);
    });
    axios.get(transactionsUrl).then((transactions) => {
      const { data } = transactions;
      const mappedTransactions = refactorTransactions(data);
      setTransactions(mappedTransactions);
    });
  }, []);

  function refactorTransactions(transactions) {
    return transactions.map((t) => {
      if (t.initiatorId === accountId) {
        t.amount *= -1;
        t.description = `Transfer_to AccountID: ${t.receiverId}`;
      }
      if (t.initiatorId !== accountId) {
        t.description = `Transfer_from AccountID: ${t.initiatorId}`;
      }
      t.date = t.date.split("T")[0] + ", " + t.date.slice(11, 16);
      t.amount = currencyFormat(t.amount);
      return t;
    });
  }
  // Format amount as in currency
  function currencyFormat(num) {
    if (num) {
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/, "$1,") + "$";
    }
  }

  return (
    <>
      {transactions.length > 0 && (
        <Grid>
          <Navbar />
          <TableContainer sx={{ marginTop: "7vh" }} align="center">
            <div sx={{ fontSize: "50px", fontWeight: "bold" }}>
              <Typography sx={{ fontSize: "65px", fontWeight: "bold" }}>
                {currencyFormat(accountBalance)}
              </Typography>
              <Typography sx={{ marginBottom: "9px", fontSize: "25px" }}>
                {accountType}
              </Typography>
              <Typography sx={{ marginBottom: "10px" }}>
                <strong>AccountID:</strong> {accountId}
              </Typography>
            </div>
            <Divider />
            <Table sx={{ width: "45vw" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCellStyled>Date, Time</TableCellStyled>
                  <TableCellStyled>Description</TableCellStyled>
                  <TableCellStyled align="left">Amount</TableCellStyled>
                  <TableCellStyled align="right">
                    Transaction Type
                  </TableCellStyled>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow
                    transactions={transaction}
                    key={transaction._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {transaction.date}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {transaction.description}
                    </TableCell>
                    <TableCell align="right">{transaction.amount}</TableCell>
                    <TableCell align="right">{transaction.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              href="/"
              color="black"
              variant="elevated"
              sx={{
                margin: "5vh",
                color: "grey",
                backgroundColor: "white",
                width: "20vh",
                border: "solid 1px grey",
              }}
              type="submit"
            >
              Return home
            </Button>
          </TableContainer>
        </Grid>
      )}
    </>
  );
};

export default AccountDetails;
