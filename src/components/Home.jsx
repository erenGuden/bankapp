import AccountCard from "./AccountCard";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Box, Divider, Grid, Modal, Stack, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";

export const BoxStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  height: "24vh",
  backgroundColor: "white",
  border: "4px solid skyblue",
  display: "inline",
  paddingTop: "14px",
  [theme.breakpoints.down("sm")]: {
    width: "90vw",
    height: "18vh",
  },
}));

const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const baseUrl = `${process.env.REACT_APP_BASE_URL}`;
  const userId = localStorage.getItem("id");
  const handleClose = () => setOpen(!open);

  const ButtonStyled = styled(Button)(({ theme }) => ({
    width: "10vw",
    marginLeft: "130px",
    marginBottom: "10px",
    backgroundColor: "lightblue",
    [theme.breakpoints.down("sm")]: {
      width: "30vw",
      marginLeft: "35px",
    },
  }));

  const handleSubmit = (e) => {
    axios
      .post(baseUrl + `/accounts`, { name, userId })
      .then((response) => {
        window.location.reload(true);
      })
      .catch((error) => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
      });
  };

  useEffect(() => {
    axios.get(baseUrl + `/accounts?userId=${userId}`).then((response) => {
      setAccounts(response.data);
    });
    axios.get(baseUrl + `/users/${userId}`).then((users) => {
      const { data } = users;
      data.username = capitalizeFirstLetter(users.data.username);
      setUserDetails(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Capitalize the first letter of username
  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <>
      {accounts.length > 0 && (
        <Grid>
          <Stack
            padding={10}
            spacing={3}
            divider={<Divider orientation="vertical" />}
            justifyContent="center"
            sx={{ alignItems: "center" }}
          >
            {userDetails.username && (
              <Typography
                color="black"
                variant="caption"
                fontSize="26px"
                fontWeight="bold"
              >
                Welcome, {userDetails.username}
              </Typography>
            )}
            {accounts.map((account) => (
              <AccountCard account={account} key={account._id} />
            ))}

            <Button
              color="primary"
              variant="contained"
              sx={{
                backgroundColor: "lightblue",
                width: "45vh",
              }}
              type="submit"
              onClick={handleClose}
            >
              Create New Account
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <BoxStyled>
                {error && (
                  <Typography align="center" color="red" fontWeight="bold">
                    Account name can not be empty
                  </Typography>
                )}
                <TextField
                  label="Account name"
                  variant="standard"
                  required
                  sx={{
                    width: "80%",
                    margin: "18px",
                    marginLeft: "30px",
                  }}
                  onChange={(e) => setName(e.target.value)}
                />
                <ButtonStyled
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </ButtonStyled>
                <ButtonStyled
                  color="primary"
                  variant="contained"
                  onClick={handleClose}
                >
                  Cancel
                </ButtonStyled>
              </BoxStyled>
            </Modal>
          </Stack>
        </Grid>
      )}
    </>
  );
};

export default Home;
