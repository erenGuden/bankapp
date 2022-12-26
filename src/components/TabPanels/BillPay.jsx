import {
  Alert,
  Collapse,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import {
  ButtonStyled,
  currencyFormat,
  FormControlStyled,
  PanelPaper,
} from "../Transactions";

const BillPay = ({ accounts }) => {
  const [amount, setAmount] = useState(0);
  const [billCompanies, setBillCompanies] = useState([]);
  const [error, setError] = useState(false);
  const [initiatorId, setInitiatorId] = useState("");
  const [open, setOpen] = useState(true);
  const [receiverId, setReceiverId] = useState("");
  const [success, setSuccess] = useState(false);
  const [systemMessage, setSystemMessage] = useState("");
  const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

  useEffect(() => {
    axios.get(baseUrl + `/bill-pay`).then((response) => {
      setBillCompanies(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    setInitiatorId(e.target.value);
  };

  const handleChange = (e) => {
    setReceiverId(e.target.value);
  };

  const handleSubmit = (e) => {
    axios
      .post(baseUrl + `/transactions/bill-pay`, {
        initiatorId,
        receiverId,
        amount,
      })
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          setError(false);
          setSystemMessage(response.data);
        }
      })
      .catch((error) => {
        setError(true);
        setSuccess(false);
        setSystemMessage(error.response.data);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      });
  };

  return (
    <PanelPaper>
      <FormControlStyled>
        {success && (
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                    window.location.reload(true);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {systemMessage}
            </Alert>
          </Collapse>
        )}
        {error && (
          <Collapse in={open}>
            <Alert
              variant="outlined"
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {systemMessage}
            </Alert>
          </Collapse>
        )}
        <InputLabel id="demo-simple-select-helper-label">Send From:</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          variant="outlined"
          value={initiatorId}
          onChange={onChange}
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
          Pay to:
        </InputLabel>
        <Select
          id="demo-simple-select-helper"
          variant="outlined"
          value={receiverId}
          onChange={handleChange}
        >
          {billCompanies.map((company) => (
            <MenuItem key={company._id} value={company._id}>
              {company.name}
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
          defaultValue="0"
          onChange={(e) => setAmount(e.target.value)}
        />
        <ButtonStyled
          color="primary"
          variant="contained"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </ButtonStyled>
      </FormControlStyled>
    </PanelPaper>
  );
};

export default BillPay;
