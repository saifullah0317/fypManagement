import { Button, TextField, Typography, Snackbar, Alert,
  CircularProgress, } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../ConfirmEmail.css";
import {
  changePassword,
  verifyEmailForgetPassword,
  verifyToken,
} from "../../../actions/auth";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

const ConfirmEmail = () => {
  const [passwordData, setPasswordData] = useState({password: '', confirmPassword: ''});
  const [isTokenVerified, setIsTokenVerified] = useState(1);

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [alertText, setAlertText] = useState("");
  const [isUpdated, setIsUpdated] = useState(false)

  const navigate = useNavigate();

  const { token } = useParams();

  useEffect(() => {
    if (token) {
      dispatch(verifyToken(token, setIsTokenVerified));
    }
  }, []);

  const dispatch = useDispatch();

  console.log(isUpdated)

  const changePasswordHandler = (e) => {
    e.preventDefault();

    console.log(token);
    dispatch(
      changePassword(
        passwordData,
        setPasswordData,
        token,
        setSnackbarSeverity,
        setSnackbar,
        setAlertText,
        setLoading,
        setIsUpdated,
        navigate
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
        Change Password
      </Typography>

      <div className="confirmBox">
        {isUpdated == false ? (

<>
        {isTokenVerified == 1 && <p>Loading...</p>}
        {isTokenVerified == 2 && (
          <>
            <h1 className="titleVerify">Change Your password</h1>
            <form onSubmit={changePasswordHandler}>
              <div className="changePasswordInput">
                <TextField
                  fullWidth
                  className="btnMaxField"
                  required
                  label="New Password"
                  value={passwordData?.password}
                  type={"password"}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      password: e.target.value,
                    })
                  }
                />
                <TextField
                  className="btnMaxField"
                  required
                  label="Confirm Password"
                  value={passwordData?.confirmPassword}
                  type={"password"}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />

                <Button type="submit" variant="contained"  disabled={loading}
                    endIcon={
                      loading && <CircularProgress size={20} color="inherit" />
                    }
                  >
                    {loading ? "Updating Password..." : "Update Password"}
                  
                </Button>
              </div>
            </form>
          </>
        )}
        {isTokenVerified == 3 && (
          <>
            <p style={{ fontWeight: "300", fontSize: "16pt" }}>
              Link is Expired
            </p>

            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "1rem" }}
              onClick={() => navigate("/auth")}
            >
              Go to Login
            </Button>
          </>
        )}
</>
        ): (
          <>
          <p style={{ fontWeight: "300", fontSize: "16pt" }}>
            Password Updated
          </p>

          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "1rem" }}
            onClick={() => navigate("/auth")}
          >
            Go to Login
          </Button>
        </>
        )}
        
      </div>
    </div>
  );
};

export default ConfirmEmail;
