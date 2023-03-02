import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, CircularProgress, Grid, Snackbar } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { FormGroup } from "@mui/material";
import { FormControl } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import GroupList from "./GroupList";

import { addMember, getMembers } from "../../../../actions/groupActions";

// import './Grouping.css'
import "./Grouping.css";
import { useDispatch, useSelector } from "react-redux";

const Grouping = () => {
  const [memberEmail, setMemberEmail] = useState("");
  const [send, setSend] = useState(false);

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [alertText, setAlertText] = useState("");

  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.authData);
  const groupMembers = useSelector((state) => state.groups.groupMembers);

  console.log(groupMembers);
  useEffect(() => {
    getAllMembers();
  }, []);

  const getAllMembers = () => {
    dispatch(getMembers(authData?.email));
  };

  const sendInvitation = (e) => {
    e.preventDefault();
    dispatch(
      addMember(
        authData?.email,
        memberEmail,
        setMemberEmail,
        getAllMembers,
        setSnackbarSeverity,
        setSnackbar,
        setAlertText,
        setLoading
      )
    );
  };
  const ConfirmToken = (e) => {
    e.preventDefault();
    setSend(false);
  };
  return (
    <div className="">
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

      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <form id="1" className="formstyle" onSubmit={sendInvitation}>
            <FormGroup sx={{ alignItems: "center" }}>
              <h2 className="font">Create Group</h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <TextField
                  id="2"
                  label="Member Email"
                  required
                  type={"email"}
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                />

                <Button
                  variant="contained"
                  color="primary"
                  // size="large"
                  type="submit"
                  // onClick={RequestSent}
                  disabled={loading}
                  endIcon={
                    loading && <CircularProgress size={20} color="inherit" />
                  }
                >
                  {loading ? "Inviting..." : "Invite"}
                  
                </Button>
              </div>
            </FormGroup>
          </form>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>

      <GroupList groupMembers={groupMembers} />
    </div>
  );
};

export default Grouping;
