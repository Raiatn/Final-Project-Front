import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Landing } from "./Pages/Landing";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import Dashboard from "./Pages/Dashboard";
import ChangePasswordPage from "./Pages/ChangePasswordPage";
import Profile from "./Pages/Profile";
import AppointmentsPage from "./Pages/AppointmentPage";
import AppintmentSettingPage from "./Pages/AppointmentSettingPage";

const App = ()=>{
  return(
  
      <Routes>
        <Route path="/" element={<Landing/>} ></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/signup" element={<SignUpPage/>}></Route>
        <Route path="/Dashboard" element={<Dashboard/>}></Route>
        <Route path="/change-password" element={<ChangePasswordPage/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/appoinments" element={<AppointmentsPage/>}></Route>
        <Route path="/appointments/:id" element={<AppintmentSettingPage/>}></Route>
      </Routes>
    
  )
}

export default App;