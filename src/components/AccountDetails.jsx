import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useSearchParams } from "react-router-dom";

const AccountDetails = () => {
  const [accountBalance, setAccountBalance] = useState();
  const [accountType, setAccountType] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactions, setTransactions] = useState([]);
  const accountId = searchParams.get("id");
  const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

  const TableCellStyled = styled(TableCell)(({ theme }) => ({
    fontSize: "16px",
    width: "10rem",
    [theme.breakpoints.down("sm")]: {
      align: "right",
    },
  }));

  const DateTableCellStyled = styled(TableCellStyled)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }));

  useEffect(() => {
    axios.get(baseUrl + `/accounts/${accountId}`).then((response) => {
      setAccountBalance(response.data.balance);
      setAccountType(response.data.name);
    });
    axios.get(baseUrl + `/transactions/${accountId}`).then((transactions) => {
      const { data } = transactions;
      const mappedTransactions = refactorTransactions(data);
      setTransactions(mappedTransactions);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function refactorTransactions(transactions) {
    return transactions.map((t) => {
      if (t.initiatorId === accountId) {
        t.amount *= -1;
        t.description = `${t.type}_to AccountID: ${t.receiverId}`;
      }
      if (t.initiatorId !== accountId) {
        t.description = `${t.type}_from AccountID: ${t.initiatorId}`;
      }
      t.date = t.date.split("T")[0] + ", " + t.date.slice(11, 16);
      t.amount = currencyFormat(t.amount);
      return t;
    });
  }
  // Format amount as in currency
  function currencyFormat(num) {
    if (num < 0) {
      num *= -1;
      num =
        "-$" + (num || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    if (num > 0 || num === 0) {
      num =
        "$" + (num || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    return num;
  }

  return (
    <>
      <TableContainer sx={{ marginTop: "7vh" }} align="center">
        {accountType && (
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
        )}
        <Divider sx={{ width: "100vw" }} />
        {transactions.length === 0 ? (
          <Typography marginTop="10px" fontSize="18px">
            No transaction found...
          </Typography>
        ) : (
          <Table
            sx={{ width: "45vw" }}
            table-layout="fixed"
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <DateTableCellStyled>Date, Time</DateTableCellStyled>
                <TableCellStyled align="left">Description</TableCellStyled>
                <TableCellStyled align="right">Amount</TableCellStyled>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  transactions={transaction}
                  key={transaction._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <DateTableCellStyled
                    component="th"
                    scope="row"
                    sx={{ fontSize: "14px" }}
                  >
                    {transaction.date}
                  </DateTableCellStyled>
                  <TableCell component="th" scope="row" align="left">
                    {transaction.description}
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "text.secondary",
                        display: { md: "none", lg: "none" },
                      }}
                    >
                      {transaction.date}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{transaction.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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
    </>
  );
};

export default AccountDetails;
