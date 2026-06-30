import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EmployeeLogIn.css";

// Import your robot image
// Place robot.png inside src/assets/
import robot from "../assets/robot.png";

const EmployeeLogIn = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Add your login validation here later

    navigate("/employee-dashboard");
  };

  return (
    <>
      <div className="background">
        <div className="glow-dark"></div>
        <div className="glow-blue"></div>
      </div>

      <div className="container">
        {/* LEFT SIDE */}

        <div className="left">
          {/*
            ADD ROBOT PNG HERE LATER
            Replace robot.png with your own image if needed.
          */}

          <img
            src={robot}
            className="robot-image"
            alt="HR Robot"
          />
        </div>

        {/* RIGHT SIDE */}

        <div className="right">
          <div className="login-card">
            <div className="logo">
              HR LEAVE MANAGEMENT SYSTEM
            </div>

            <h1>Log In</h1>

            <p className="subtitle">
              Access your employee leave portal
            </p>

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Work Email"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="options">
                <label className="remember">
                  <input type="checkbox" />
                  Remember Me
                </label>

                {/* FORGOT PASSWORD PAGE */}
                <Link to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>

              {/* LOGIN DESTINATION PAGE */}

              <button
                type="submit"
                className="login-btn"
              >
                Log In
              </button>
            </form>

            <div className="links">
              <p>
                Don't have an account?{" "}

                {/* SIGN UP PAGE */}

                <Link to="/employee-signup">
                  Sign Up
                </Link>
              </p>

              <p>
                HR Manager?{" "}

                {/* HR LOGIN PAGE */}

                <Link to="/hr-login">
                  Log In Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
/*Luke Moran*/
export default EmployeeLogIn;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeLogIn from "./pages/EmployeeLogIn";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeSignUp from "./pages/EmployeeSignUp";
import HRLogin from "./pages/HRLogin";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeLogIn />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee-signup" element={<EmployeeSignUp />} />
        <Route path="/hr-login" element={<HRLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;