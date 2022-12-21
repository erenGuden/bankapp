import {
  Autocomplete,
  Button,
  FormControl,
  InputAdornment, OutlinedInput,
  Tab,
  Tabs,
  TextField
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useState } from "react";

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

const Transactions = ({ account }) => {
  
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const AutoCompleteStyled = styled(Autocomplete)(({ theme }) => ({
    width: 550,
    marginLeft: "30%",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      width: 200,
      margin: "0",
      paddingLeft: "100px",
      marginTop: "10px",
    },
  }));

  const FormControlStyled = styled(FormControl)(({ theme }) => ({
    width: 550,
    marginLeft: "30%",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      width: 200,
      margin: "0",
      paddingLeft: "100px",
      paddingTop: "10px",
    },
  }));

  const TextFieldStyled = styled(TextField)(({ theme }) => ({
    width: 550,
    marginLeft: "30%",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      width: 200,
      margin: "0",
      paddingLeft: "100px",
      paddingTop: "10px",
    },
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    width: 550,
    marginLeft: "30%",
    marginTop: "10px",
    backgroundColor: "lightblue",
    [theme.breakpoints.down("sm")]: {
      width: 200,
      margin: "0",
      marginLeft: "100px",
      paddingTop: "5px",
    },
  }));

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
        <AutoCompleteStyled
          disablePortal
          id="combo-box-demo"
          options={["0", "1"]}
          renderInput={(params) => (
            <TextField {...params} label="Transfer from" required />
          )}
        />
        <AutoCompleteStyled
          disablePortal
          id="combo-box-demo"
          options={["top100Films"]}
          renderInput={(params) => (
            <TextField {...params} label="Transfer to" required />
          )}
        />
        <FormControlStyled>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            placeholder="Amount"
          />
        </FormControlStyled>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AutoCompleteStyled
          id="combo-box-demo"
          options={["A"]}
          renderInput={(params) => (
            <TextField {...params} label="Send from" required />
          )}
        />

        <TextFieldStyled
          id="username"
          name="username"
          placeholder="Receiver userID"
          variant="outlined"
          required
        />
        <TextFieldStyled
          id="username"
          name="username"
          placeholder="Receiver Account ID"
          variant="outlined"
          required
        />
        <FormControlStyled>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            placeholder="Amount"
            required
          />
        </FormControlStyled>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AutoCompleteStyled
          id="combo-box-demo"
          options={["A"]}
          renderInput={(params) => (
            <TextField {...params} label="Send from" required />
          )}
        />
        <AutoCompleteStyled
          id="combo-box-demo"
          options={["Electric Company"]}
          renderInput={(params) => (
            <TextField {...params} label="Pay to" required />
          )}
        />
        <FormControlStyled>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            placeholder="Amount"
            required
          />
        </FormControlStyled>
      </TabPanel>
      <ButtonStyled color="primary" variant="contained" type="submit">
        Submit
      </ButtonStyled>
    </BoxStyled>
  );
};

export default Transactions;

function TabPanel(props) {
  const { children, value, index } = props;
  return <>{value === index && <h1>{children}</h1>}</>;
}
