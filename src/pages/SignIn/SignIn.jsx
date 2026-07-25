import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import  loginUser  from "../../api/auth";
import "./index.css";

const SignIn = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // If user is already logged in, go to Home page directly
  useEffect(() => {
    const existingToken = Cookies.get("jwt_token");
    if (existingToken) {
      navigate("/");
    }
  }, [navigate]);

  // Called when user clicks the Sign In button
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const serverResponse = await loginUser(emailInput, passwordInput);

      // Extract token from server response
      // API returns: { success: true, data: { token: "..." } }
      const authToken =
        (serverResponse.data && serverResponse.data.token) ||
        (serverResponse.data && serverResponse.data.jwt_token) ||
        (serverResponse.data && serverResponse.data.jwtToken) ||
        serverResponse.token ||
        serverResponse.jwt_token ||
        serverResponse.jwtToken;

      if (authToken) {
        Cookies.set("jwt_token", authToken, { expires: 7 });
        navigate("/");
      } else {
        setErrorMessage("Login failed. Token not found in response.");
      }
    } catch (err) {
      setErrorMessage(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Left Panel — Branding */}
        <div className="brand-panel">
          <div className="brand-overlay"></div>
          <div className="brand-content">
            <h1 className="login-logo">NXTFLIX</h1>
            <p className="login-tagline">
              Unlimited movies, shows and more. Watch anywhere. Cancel anytime.
            </p>
          </div>
        </div>

        {/* Right Panel — Sign In Form */}
        <div className="form-panel">
          <div className="form-container">
            <h2 className="form-title">Sign In</h2>

            {/* Error message banner */}
            {errorMessage && (
              <div className="error-banner" role="alert">
                <span className="error-icon">⚠</span>
                <span className="error-text">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="login-form" noValidate={false}>

              {/* Email Field */}
              <div className="input-group">
                <label htmlFor="email" className="form-label">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="form-input"
                />
              </div>

              {/* Password Field */}
              <div className="input-group">
                <label htmlFor="password" className="form-label">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="form-input"
                />
              </div>

              {/* Sign In Button */}
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
