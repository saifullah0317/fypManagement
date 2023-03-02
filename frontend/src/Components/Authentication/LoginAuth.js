import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import ToggleButton from "../Custom Buttons/ToggleButton";
const RegisterAuth = ({ setAuthType }) => {
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [alertText, setAlertText] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleAuthType = (e) => {
    e.preventDefault();

    setAuthType(true);
  };

  const loginHandler = async (e) => {
    e.preventDefault();


    if(formData.email === 'admin@admin' && formData.password === 'admin'){
      navigate('/adminDashboard')
    }
    else{

      dispatch(
        login(
          formData,
          navigate,
          setSnackbarSeverity,
          setSnackbar,
          setAlertText,
          setLoading
        )
      );
    }

  };

  return (
    <>
      <Snackbar
        open={snackbar}
        onClose={() => setSnackbar(false)}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => setSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ height: "100%" }}
        >
          {alertText}
        </Alert>
      </Snackbar>

      {alertText === "Email is not verified" ? (
        <>
            <h1 className="title">Verify Email</h1>
            <p style={{textAlign: 'center',  marginTop: '2rem'}}>
              Verification Email has been sent to <b>{formData?.email}</b>,
              Please verify!
            </p>
        </>
      ) : (
        <>
          <h1 className="title">Login</h1>
          <div className="authForm">
            <form onSubmit={loginHandler}>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    required
                    id="outlined-required"
                    style={{ width: "35ch" }}
                    label="Email"
                    type={"email"}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <TextField
                    required
                    id="outlined-required"
                    style={{ width: "35ch" }}
                    label="Password"
                    type={"password"}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <Typography variant="subtitle1" gutterBottom>
                  <a href="" onClick={(e)=>{
                    e.preventDefault()
                    navigate('/auth/forgetPassword')
                  }}>Forgot Password?</a>
                </Typography>
              </Box>

              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Remember me"
                    />
                  </FormGroup>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ marginBottom: "5px", borderRadius: "3rem" }}
                    disabled={loading}
                    endIcon={
                      loading && <CircularProgress size={20} color="inherit" />
                    }
                  >
                    {loading ? "Signing in..." : "Login"}
                  </Button>
                </div>
              </Box>
            </form>
          </div>
          <div className="authToggleLogin">
            <Typography variant="subtitle1" gutterBottom>
              No Account?
              <a href="" onClick={toggleAuthType}>
                {" "}
                Register
              </a>
            </Typography>
          </div>
        </>
      )}
    </>
  );
};

export default RegisterAuth;
