import {
  Alert,
  Collapse,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ButtonStyled,
  currencyFormat,
  FormControlStyled,
  PanelPaper,
} from "../Transactions";
import CloseIcon from "@mui/icons-material/Close";

const Send = ({ accounts }) => {
  const [initiatorId, setInitiatorId] = useState("");
  const [receiverAccounts, setReceiverAccounts] = useState([]);
  const [receiverUsername, setReceiverUsername] = useState();
  const [receiverUserId, setReceiverUserId] = useState();
  const [receiverId, setReceiverAccountId] = useState();
  const [systemMessage, setSystemMessage] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState();
  const [open, setOpen] = useState(true);
  const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

  const handleSubmit = (e) => {
    axios
      .post(baseUrl + `/transactions/transfer`, {
        initiatorId,
        receiverId,
        amount,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setSuccess(true);
          setError(false);
          setSystemMessage(response.data);
        }
      });
    //   .catch((error) => {
    //     setError(true);
    //     setSystemMessage(error.response.data);
    //     setTimeout(() => {
    //       setSuccess(false);
    //     }, 3000);
    // });
  };

  useEffect(() => {
    if (!receiverUsername) return;
    axios
      .get(baseUrl + `/users?username=${receiverUsername}`)
      .then((response) => {
        const user = response?.data?.find(
          ({ username }) => username === receiverUsername
        );
        if (user?._id) setReceiverUserId(user._id);
      });
  }, [receiverUsername]);

  useEffect(() => {
    if (!receiverUserId) return;
    axios.get(baseUrl + `/accounts?userId=${receiverUserId}`).then((result) => {
      setReceiverAccounts(result.data.map((acc) => acc._id));
    });
  }, [receiverUserId]);

  useEffect(() => {
    if (!receiverId) setError(false);
  }, [receiverId]);

  useEffect(() => {
    if (!receiverAccounts.length || !receiverId.length) return;
    if (!receiverAccounts.includes(receiverId)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [receiverId]);

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
        <InputLabel id="demo-simple-select-helper-label">Send From:</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          variant="outlined"
          value={initiatorId}
          onChange={(e) => setInitiatorId(e.target.value)}
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
          Receiver Username:
        </InputLabel>
        <TextField
          id="demo-simple-select-helper"
          variant="outlined"
          onChange={(e) => setReceiverUsername(e.target.value)}
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
          onChange={(e) => setReceiverAccountId(e.target.value)}
          required
        />
        {error && (
          <FormHelperText
            id="component-error-text"
            sx={{ fontWeight: "bold" }}
            error
          >
            Invalid Account ID
          </FormHelperText>
        )}
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
          disabled={
            !receiverId || !receiverUserId || !initiatorId || !amount || error
          }
        >
          Submit
        </ButtonStyled>
      </FormControlStyled>
    </PanelPaper>
  );
};

export default Send;
