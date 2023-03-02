import { TextField } from "@mui/material";
import React,{useState} from "react";
import "./ConfirmEmail.css";
const ConfirmEmail = () => {

    const [email, setEmail] = useState("")

  return (
    <div className="confirmContainer">
      <div className="confirmBox">
        <h1 className="titleVerify">Email Verification</h1>
        <p>Emter your email</p>
        <TextField
              className="btnMaxField"
                required
                label="Email"
                type={"email"}
                onChange={(e)=>setEmail( e.target.value)}
              />

      </div>
    </div>
  );
};

export default ConfirmEmail;
