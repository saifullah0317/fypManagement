import "./App.css";
import Auth from "./Components/Authentication/AuthPage";
import Dashboard from "./Components/Dashboard/App";
import Welcome from "./Components/Welcome/Welcome";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import ChangePassword from "./Components/Authentication/ForgetPassword/ChangePassword";
import ForgetPassword from "./Components/Authentication/ForgetPassword/ForgetPassword";

import AdminDashboard from "./Components/Dashboard/App";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/adminDashboard" element={<AdminDashboard  />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/changePassword/:token" element={<ChangePassword />} />
          <Route path="/auth/forgetPassword" element={<ForgetPassword />} />
          <Route path="/auth/changePassword/:token" element={<ChangePassword />} />
          <Route path="/home/*" exact element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
