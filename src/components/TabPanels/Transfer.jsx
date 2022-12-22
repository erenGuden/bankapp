import { useState } from "react";
import {
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
  PanelBox,
} from "../Transactions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Transfer = ({ accounts }) => {
  const [initiatorId, setInitiatorId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [systemMessage, setSystemMessage] = useState("");
  const transferUrl = `${process.env.REACT_APP_BASE_URL}/transactions/transfer`;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    axios
      .post(transferUrl, { initiatorId, receiverId, amount })
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          setSystemMessage(response.data);
          setTimeout(() => {
            setSuccess(false);
            navigate("/");
          }, 4000);
        }
      })
      .catch((error) => {
        setError(true);
        setSystemMessage(error.response.data);
        setTimeout(() => {
          setSuccess(false);
          window.location.reload(true);
        }, 3000);
      });
  };

  return (
    <PanelBox>
      <FormControlStyled>
        {success && (
          <Typography
            align="center"
            backgroundColor="green"
            color="white"
            fontWeight="bold"
          >
            {systemMessage}. Redirecting to the home page...
          </Typography>
        )}
        {error && (
          <Typography
            align="center"
            backgroundColor="red"
            color="white"
            fontWeight="bold"
          >
            {systemMessage}. Reloading the page...
          </Typography>
        )}
        <InputLabel id="demo-simple-select-helper-label">Send From:</InputLabel>
        <Select
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
          Send To:
        </InputLabel>
        <Select
          id="demo-simple-select-helper"
          variant="outlined"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
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
    </PanelBox>
  );
};

export default Transfer;
