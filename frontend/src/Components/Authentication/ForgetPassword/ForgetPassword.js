import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "../ConfirmEmail.css";
import { verifyEmailForgetPassword } from "../../../actions/auth";
import { useDispatch } from "react-redux";
const ConfirmEmail = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [alertText, setAlertText] = useState("");

  const [isSentEmail, setIsSentEmail] = useState(false);

  const dispatch = useDispatch();

  const verifyEmailHandler = (e) => {
    e.preventDefault();
    dispatch(
      verifyEmailForgetPassword(
        email,
        setSnackbarSeverity,
        setSnackbar,
        setAlertText,
        setLoading,
        setIsSentEmail
      )
    );
  };

  return (
    <div className="confirmContainer">
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
      <Typography className="center" variant="h4" color="white" gutterBottom>
        Forget Password
      </Typography>

      <div className="confirmBox">
        <h1 className="titleVerify">Verify Email</h1>
        {isSentEmail ? (
          <>
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              Verification Email has been sent to <b>{email}</b>,
              Please verify!
            </p>
          </>
        ) : (
          <form onSubmit={verifyEmailHandler}>
            <div className="verifyMailInput">
              <TextField
                className="btnMaxField"
                required
                label="Email"
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                endIcon={
                  loading && <CircularProgress size={20} color="inherit" />
                }
              >
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmail;
