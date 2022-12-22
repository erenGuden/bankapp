import {
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useState } from "react";
import {
  ButtonStyled,
  currencyFormat,
  FormControlStyled,
  PanelBox,
} from "../Transactions";

const Transfer = ({ accounts }) => {
  const [value, setValue] = useState(0);
  const userId = localStorage.getItem("id");
  const baseUrl = `${process.env.REACT_APP_BASE_URL}/accounts?userId=${userId}`;
  const transferUrl = `${process.env.REACT_APP_BASE_URL}/api/transactions/transfer`;

  return (
    <PanelBox>
      <FormControlStyled>
        <InputLabel id="demo-simple-select-helper-label">Send From:</InputLabel>
        <Select
          id="demo-simple-select-helper"
          variant="outlined"
          defaultValue={""}
        >
          {accounts.map((account) => (
            <MenuItem key={account._id} value={account._id}>
              {account.name} : {currencyFormat(account.balance)}
            </MenuItem>
          ))}
        </Select>
        <InputLabel
          sx={{ marginTop: "10px" }}
          id="demo-simple-select-helper-label"
        >
          Send To:
        </InputLabel>
        <Select
          id="demo-simple-select-helper"
          variant="outlined"
          defaultValue={""}
        >
          {accounts.map((account) => (
            <MenuItem key={account._id} value={account._id}>
              {account.name} : {currencyFormat(account.balance)}
            </MenuItem>
          ))}
        </Select>
        <InputLabel
          sx={{ marginTop: "10px" }}
          htmlFor="outlined-adornment-amount"
        >
          Amount:
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          type="number"
          defaultValue="0.00"
        />
        <ButtonStyled color="primary" variant="contained" type="submit">
          Submit
        </ButtonStyled>
      </FormControlStyled>
    </PanelBox>
  );
};

export default Transfer;
