import {
  Alert,
  Collapse,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import {
  ButtonStyled,
  currencyFormat,
  FormControlStyled,
  PanelPaper,
} from "../Transactions";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useState } from "react";

const Transfer = ({ accounts }) => {
  const [amount, setAmount] = useState(0);
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [error, setError] = useState(false);
  const [initiatorId, setInitiatorId] = useState("");
  const [open, setOpen] = useState(true);
  const [receiverId, setReceiverId] = useState("");
  const [success, setSuccess] = useState(false);
  const [systemMessage, setSystemMessage] = useState("");
  const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

  const onChange = (e) => {
    setInitiatorId(e.target.value);
    const availableAccounts = accounts.filter((account) => {
      return account._id !== e.target.value;
    });
    setAvailableAccounts(availableAccounts);
  };

  const handleSubmit = (e) => {
    axios
      .post(baseUrl + `/transactions/transfer`, {
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
        <div style={{ minHeight: "8vh" }}>
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
        </div>
        <InputLabel id="demo-simple-select-helper-label">Send From:</InputLabel>
        <Select
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
          Send To:
        </InputLabel>
        <Select
          id="demo-simple-select-helper"
          variant="outlined"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
        >
          {availableAccounts.map((account) => (
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
          placeholder="0"
          onChange={(e) => setAmount(e.target.value)}
        />
        <ButtonStyled
          color="primary"
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          disabled={!initiatorId || !receiverId || amount <= 0}
        >
          Submit
        </ButtonStyled>
      </FormControlStyled>
    </PanelPaper>
  );
};

export default Transfer;
