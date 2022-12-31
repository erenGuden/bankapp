import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Button,
  Collapse,
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Box, styled } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const BoxStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "57vh",
  backgroundColor: "white",
  display: "inline",
  paddingTop: "10px",
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

const Profile = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [username, setUsername] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();
  const [securityQuestion, setSecurityQuestion] = useState();
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState();
  const [systemMessage, setSystemMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const userId = localStorage.getItem("id");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    axios.get(baseUrl + `/users/${userId}`).then((users) => {
      const { data } = users;
      setUserDetails(data);
      console.log(userDetails);
      const oldPassword = userDetails.password;
    });
  }, []);

  const handleSubmit = (e) => {
    axios
      .put(baseUrl + `/users/username/${userId}`, { username })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setSuccess(true);
          setError(false);
          setSystemMessage(response.data);
        }
      })
      .catch((error) => {
        setError(true);
        setSuccess(false);
        setSystemMessage("Username is already taken");
      });
  };

  const handleAddress = (e) => {
    axios
      .put(baseUrl + `/users/address/${userId}`, { address })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setSuccess(true);
          setError(false);
          setSystemMessage(response.data);
        }
      })
      .catch((error) => {
        setError(true);
        setSuccess(false);
        setSystemMessage("Unknown error. Try again later");
      });
  };

  const handlePassword = (e) => {
    axios.put(baseUrl + `/users/password/${userId}`, { pass });
  };

  const handleQuestion = (e) => {
    axios
      .put(baseUrl + `/users/security-question/${userId}`, {
        securityQuestion,
        securityQuestionAnswer,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setSuccess(true);
          setError(false);
          setSystemMessage(response.data);
        }
        if (response.status === 400) {
          setSuccess(false);
          setError(true);
          setSystemMessage(response.data);
        }
      })
      .catch((error) => {
        setError(true);
        setSuccess(false);
        setSystemMessage(error.response.data);
      });
  };

  const TypographyStyled = styled(Typography)(({ theme }) => ({
    width: "50%",
    fontWeight: "bold",
    fontFamily: "monospace",
    fontSize: "18px",
  }));

  return (
    <BoxStyled>
      <div
        style={{
          fontWeight: "bold",
          fontSize: "30px",
          alignItems: "center",
          paddingBottom: 55,
          textAlign: "center",
        }}
      >
        Edit User Information
      </div>
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
      <Accordion
        sx={{ width: "100%", minHeight: 60, boxShadow: 3 }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <TypographyStyled>Username</TypographyStyled>
          <Typography sx={{ color: "text.secondary", fontFamily: "monospace" }}>
            Change username
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            required
            placeholder={userDetails.username}
            variant="standard"
            sx={{ width: 330, height: 40, paddingRight: 5 }}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Button onClick={handleSubmit} disabled={!username}>
            Submit
          </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ width: "100%", minHeight: 60, boxShadow: 3 }}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <TypographyStyled>Password</TypographyStyled>
          <Typography sx={{ fontFamily: "monospace", color: "text.secondary" }}>
            Change password
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Input
            required
            sx={{ width: 330, height: 40, marginRight: 5 }}
            placeholder="Enter current password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Input
            required
            sx={{ display: "flex", width: 330, height: 40, marginRight: 5 }}
            placeholder="Enter new password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Input
            required
            sx={{ width: 330, height: 40, marginRight: 5 }}
            placeholder="Confirm new password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button>Submit</Button>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ width: "100%", minHeight: 60, boxShadow: 3 }}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <TypographyStyled>Address</TypographyStyled>
          <Typography sx={{ fontFamily: "monospace", color: "text.secondary" }}>
            Change address
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            required
            placeholder={userDetails.address}
            variant="standard"
            sx={{ width: 330, height: 40, paddingRight: 5 }}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Button onClick={handleAddress} disabled={!address}>
            Submit
          </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ width: "100%", minHeight: 60, boxShadow: 3 }}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <TypographyStyled>Security Question</TypographyStyled>
          <Typography sx={{ fontFamily: "monospace", color: "text.secondary" }}>
            Change security question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            required
            placeholder={userDetails.securityQuestion}
            variant="standard"
            sx={{ display: "grid", width: 330, height: 40, paddingRight: 5 }}
            onChange={(e) => setSecurityQuestion(e.target.value)}
          />
          <TextField
            required
            placeholder="Security question answer"
            variant="standard"
            sx={{ width: 330, height: 40, paddingRight: 5 }}
            onChange={(e) => setSecurityQuestionAnswer(e.target.value)}
          />
          <Button
            disabled={!securityQuestionAnswer || !securityQuestionAnswer}
            onClick={handleQuestion}
          >
            Submit
          </Button>
        </AccordionDetails>
      </Accordion>
      <div
        style={{
          paddingBottom: 140,
        }}
      />
    </BoxStyled>
  );
};

export default Profile;
