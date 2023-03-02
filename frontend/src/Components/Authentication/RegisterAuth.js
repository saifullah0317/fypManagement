import React, { useState } from "react";
import {
  Paper,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import ToggleButton from "../Custom Buttons/ToggleButton";
import { useDispatch } from "react-redux";
import { register } from "../../actions/auth";
import { number } from "prop-types";

const RegisterAuth = ({ setAuthType }) => {
  const [userType, setUserType] = useState(true);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [alertText, setAlertText] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const location = useNavigate();
  const [formData, setFormData] = useState({
    userType: userType ? "Student" : "Teacher",
  });

  console.log(formData);

  const setUserTypeHandler = () => {
    setUserType(!userType);
    setFormData({ ...formData, userType: !userType ? "Student" : "Teacher" });
    setFormData({});
  };

  const toggleAuthType = (e) => {
    e.preventDefault();
    setAuthType(false);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    console.log(formData);

    dispatch(
      register(
        formData,
        location,
        setSnackbarSeverity,
        setSnackbar,
        setAlertText,
        setLoading,
        setAuthType
      )
    );
    // setFormData({})
  };
  console.log(loading);

  function formatPhoneNumber(phoneNumber) {
    var cleaned = ("" + phoneNumber).replace(/\D/g, "");
    let formattedValue = `${cleaned.substring(0, 3)}${
      cleaned.length > 3 ? "-" : ""
    }${cleaned.substring(3, 6)}${
      cleaned.length > 6 ? "-" : ""
    }${cleaned.substring(6, 11)}`;

    return formattedValue;
  }
  
  function cnicFormat(phoneNumber) {
    var cleaned = ("" + phoneNumber).replace(/\D/g, "");
    let formattedValue = `${cleaned.substring(0, 6)}${
      cleaned.length > 3 ? "-" : ""
    }${cleaned.substring(3, 6)}${
      cleaned.length > 6 ? "-" : ""
    }${cleaned.substring(6, 11)}`;

    return formattedValue;
  }
  
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
      <div style={{ display: "flex", justifyContent: "right", margin: "10px" }}>
        <ToggleButton setType={setUserTypeHandler} type={userType} />
      </div>

      <h1 className="title">Register as {userType ? "Student" : "Teacher"}</h1>
      <div className="authForm">
        <form onSubmit={registerUser}>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
          >
            <div>
              <TextField
                className="btnMaxField"
                required
                label="First Name"
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <TextField
                className="btnMaxField"
                required
                label="Last Name"
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
            <div>
              <TextField
                className="btnMaxField"
                required
                label="Email"
                type={"email"}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <TextField
                className="btnMaxField"
                required
                value={formData?.phoneNumber}
                label="Phone Number"
                // type={"number"}
                onChange={(e) => {
                  if (e.target.value.length < 13) {
                    setFormData({
                      ...formData,
                      phoneNumber: formatPhoneNumber(e.target.value),
                    });
                  }
                }}
              />
            </div>
            <div>
              {userType ? (
                <TextField
                  className="btnMaxField"
                  required
                  label="Registration Number"
                  value={formData.regNo}
                  onChange={(e) =>{
                    if(e.target.value.length < 12)
                    setFormData({ ...formData, regNo: (e.target.value )})
                  }}
                />
              ) : (
                <TextField
                  className="btnMaxField"
                  required
                  label="Teacher ID"
                  onChange={(e) =>
                    setFormData({ ...formData, teacherId: e.target.value })
                  }
                />
              )}
              <TextField
                className="btnMaxField"
                required
                label="CNIC"
                value={formData.cnic}
                onChange={(e) =>{
                  if(e.target.value.length < 14){
                    setFormData({ ...formData, cnic: (e.target.value) })
                  }}
                }
              />
            </div>
          </Box>
          <Box>
            <FormControl className="btnMaxSelectField">
              <InputLabel id="demo-simple-select-fullwidth-label">
                Select Department
              </InputLabel>
              <Select
                labelId="demo-simple-select-fullwidth-label"
                id="demo-simple-select-fullwidth"
                fullWidth
                // value={age}
                // onChange={(e)=>console.log(e.target.value)}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                label="Select Department"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Twenty</MenuItem>
                <MenuItem value={21}>Twenty one</MenuItem>
                <MenuItem value={22}>Twenty one and a half</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
          >
            {userType && (
              <div>
                <TextField
                  className="btnMaxField"
                  // style={{width: '20ch'}}
                  required
                  type={"Number"}
                  label="Session"
                  value={formData.session}
                  onChange={(e) =>{
                      if(e.target.value.length < 5){

                        setFormData({ ...formData, session: e.target.value })
                      }}
                  }
                />
                <TextField
                  className="btnMaxField"
                  required
                  label="Section"
                  value={formData.section}
                  onChange={(e) =>
                    {

                      if(e.target.value.length < 2){

                        setFormData({ ...formData, section: e.target.value })
                      }
                    }
                  }
                />
              </div>
            )}

            <div>
              <TextField
                className="btnMaxField"
                required
                label="Password"
                type={"password"}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <TextField
                className="btnMaxField"
                required
                label="Confirm Password"
                type={"password"}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="registerBtnSection">
              <div className="authToggleLogin">
                <Typography variant="subtitle1" gutterBottom>
                  Already have account?
                  <a href="" onClick={toggleAuthType}>
                    {" "}
                    Login
                  </a>
                </Typography>
              </div>

              <Button
                type="submit"
                variant="contained"
                style={{ marginBottom: "5px", borderRadius: "3rem" }}
                disabled={loading}
                endIcon={
                  loading && <CircularProgress size={20} color="inherit" />
                }
              >
                Register
              </Button>
            </div>
          </Box>
        </form>
      </div>
    </>
  );
};

export default RegisterAuth;
