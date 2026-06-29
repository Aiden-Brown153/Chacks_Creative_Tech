import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EmployeeSignUp.css";

// Import your robot image
// Put robot.png inside src/assets/
import robot from "../assets/robot.png";

const EmployeeSignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add account creation logic here later

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

          <div className="signup-card">

            <div className="logo">
              HR LEAVE MANAGEMENT SYSTEM
            </div>

            <h1>Sign Up</h1>

            <p className="subtitle">
              Create your employee account
            </p>

            <form onSubmit={handleSubmit}>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="email"
                  placeholder="Work Email"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Employee ID"
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

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              {/* ACCOUNT CREATION DESTINATION */}

              <button
                type="submit"
                className="signup-btn"
              >
                Create Account
              </button>

            </form>

            <div className="links">

              Already have an account?{" "}

              {/* LOGIN PAGE */}

              <Link to="/">
                Log In
              </Link>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default EmployeeSignUp;

/*Luke Moran*/