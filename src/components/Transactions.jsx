import BillPay from "./TabPanels/BillPay";
import Send from "./TabPanels/Send";
import Transfer from "./TabPanels/Transfer";
import axios from "axios";
import { Box, styled } from "@mui/system";
import { Button, FormGroup, Paper, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";

export const BoxStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "67vh",
  backgroundColor: "white",
  display: "inline",
  paddingTop: "10px",
  width: "70%",
  [theme.breakpoints.down("sm")]: {
    border: "none",
    width: "100%",
    height: "70%",
  },
}));

export const PanelPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: 20,
  height: "54vh",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    justifyContent: "center",
    padding: 5,
  },
  [theme.breakpoints.down("sm")]: {
    boxShadow: "none",
  },
}));

// Format amount as in currency
export function currencyFormat(num) {
  return "$" + (num || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export const FormControlStyled = styled(FormGroup)(({ theme }) => ({
  width: "100%",
  maxWidth: 550,
  display: "flex",
  justifyContent: "center",
}));

export const ButtonStyled = styled(Button)(({ theme }) => ({
  maxWidth: 550,
  width: "100%",
  marginTop: 20,
  backgroundColor: "lightblue",
}));

const Transactions = () => {
  const [accounts, setAccounts] = useState([]);
  const [value, setValue] = useState(0);
  const baseUrl = `${process.env.REACT_APP_BASE_URL}`;
  const userId = localStorage.getItem("id");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios.get(baseUrl + `/accounts?userId=${userId}`).then((response) => {
      setAccounts(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Transfer accounts={accounts} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Send accounts={accounts} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BillPay accounts={accounts} />
      </TabPanel>
    </BoxStyled>
  );
};

export default Transactions;
