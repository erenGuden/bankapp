import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    Button, IconButton,
    Input,
    InputAdornment, TextField
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Box, styled } from "@mui/system";
import React, { useState } from "react";

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
  const [expanded, setExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const name = "Matt";
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              fontFamily: "monospace",
              fontSize: "18px",
            }}
          >
            Username
          </Typography>
          <Typography sx={{ color: "text.secondary", fontFamily: "monospace" }}>
            Change username
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            required
            placeholder={name}
            variant="standard"
            sx={{ width: 330, height: 40, paddingRight: 5 }}
          />

          <Button>Submit</Button>
        </AccordionDetails>
      </Accordion>
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
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              fontFamily: "monospace",
              fontSize: "18px",
            }}
          >
            Password
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
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
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              fontFamily: "monospace",
              fontSize: "18px",
            }}
          >
            Address
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Change address
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            required
            placeholder={name}
            variant="standard"
            sx={{ width: 330, height: 40, paddingRight: 5 }}
          />

          <Button>Submit</Button>
        </AccordionDetails>
      </Accordion>
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
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              fontFamily: "monospace",
              fontSize: "18px",
            }}
          >
            Security Question
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Change security question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            required
            placeholder={name}
            variant="standard"
            sx={{ display: "grid", width: 330, height: 40, paddingRight: 5 }}
          />
          <TextField
            required
            placeholder="Test"
            variant="standard"
            sx={{ width: 330, height: 40, paddingRight: 5 }}
          />
          <Button>Submit</Button>
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
