import {
  Autocomplete,
  Button,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const BoxStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "53vh",
  backgroundColor: "white",
  border: "4px solid skyblue",
  display: "inline",
  paddingTop: "10px",
  width: "60%",
  [theme.breakpoints.down("sm")]: {
    border: "none",
    width: "100%",
    height: "70%",
  },
}));
export const PanelBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: 20,
}));

const Transactions = ({ account }) => {
  const [value, setValue] = useState(0);
  const userId = localStorage.getItem("id");
  const [accounts, setAccounts] = useState([]);
  const baseUrl = `${process.env.REACT_APP_BASE_URL}/accounts?userId=${userId}`;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setAccounts(response.data);
      console.log(accounts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FormControlStyled = styled(FormGroup)(({ theme }) => ({
    width: "100%",
    maxWidth: 550,
    display: "flex",
    justifyContent: "center",
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    maxWidth: 550,
    width: "100%",
    marginTop: 20,
    backgroundColor: "lightblue",
  }));

  function TabPanel(props) {
    const { children, value, index } = props;
    return <>{value === index && <h1>{children}</h1>}</>;
  }

  return (
    <BoxStyled>
      <Tabs
        indicatorColor="secondary"
        textColor="inherit"
        value={value}
        onChange={handleChange}
        centered
      >
        <Tab label="Transfer" />
        <Tab label="Send" />
        <Tab label="Bill Pay" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <PanelBox>
          <FormControlStyled>
            <InputLabel id="demo-simple-select-helper-label">
              Send From:
            </InputLabel>
            <Select
              id="demo-simple-select-helper"
              variant="outlined"
              defaultValue={""}
            >
              {accounts.map((account) => (
                <MenuItem key={account._id} value={account._id}>
                  {account.name}
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
                  {account.name}
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
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              type="number"
            />
            <ButtonStyled color="primary" variant="contained" type="submit">
              Submit
            </ButtonStyled>
          </FormControlStyled>
        </PanelBox>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PanelBox>
          <FormControlStyled>
            <InputLabel id="demo-simple-select-helper-label">
              Send From:
            </InputLabel>
            <Select
              id="demo-simple-select-helper"
              variant="outlined"
              defaultValue={""}
            >
              {accounts.map((account) => (
                <MenuItem key={account._id} value={account._id}>
                  {account.name}
                </MenuItem>
              ))}
            </Select>
            <InputLabel
              sx={{ marginTop: "10px" }}
              id="demo-simple-select-helper-label"
            >
              Receiver Username:
            </InputLabel>
            <TextField
              id="demo-simple-select-helper"
              variant="outlined"
              required
            />
            <InputLabel
              sx={{ marginTop: "10px" }}
              id="demo-simple-select-helper-label"
            >
              Receiver Account ID:
            </InputLabel>
            <TextField
              id="demo-simple-select-helper"
              variant="outlined"
              required
            />
            <InputLabel
              sx={{ marginTop: "10px" }}
              htmlFor="outlined-adornment-amount"
            >
              Amount:
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              type="number"
            />
            <ButtonStyled color="primary" variant="contained" type="submit">
              Submit
            </ButtonStyled>
          </FormControlStyled>
        </PanelBox>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PanelBox>
          <FormControlStyled>
            <InputLabel id="demo-simple-select-helper-label">
              Send From:
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              variant="outlined"
              defaultValue={""}
            >
              {accounts.map((account) => (
                <MenuItem key={account._id} value={account._id}>
                  {account.name}
                </MenuItem>
              ))}
            </Select>
            <InputLabel
              sx={{ marginTop: "10px" }}
              id="demo-simple-select-helper-label"
            >
              Pay to:
            </InputLabel>
            <Select
              id="demo-simple-select-helper"
              variant="outlined"
              defaultValue={"Electric Company"}
            >
              <MenuItem value={"Electric Company"}>Electric Company</MenuItem>
              <MenuItem value={"Gas Company"}>Gas Company</MenuItem>

            </Select>
            <InputLabel
              sx={{ marginTop: "10px" }}
              htmlFor="outlined-adornment-amount"
            >
              Amount:
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              type="number"
            />
            <ButtonStyled color="primary" variant="contained" type="submit">
              Submit
            </ButtonStyled>
          </FormControlStyled>
        </PanelBox>
      </TabPanel>
    </BoxStyled>
  );
};

export default Transactions;
